import fs from 'fs';
import readline from 'readline';
import path from 'path';
// import { exec } from 'child_process';

// Compile with: bun build setup.ts --minify --outdir=./ --target=node

// Helper para entrada do usuário
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const askQuestion = (question: string): Promise<string> => {
	return new Promise((resolve) => rl.question(question, resolve));
};

// Função para mover/renomear pastas
const renameProjectFolder = (oldName: string, newName: string) => {
	const newPath = path.resolve('..', newName);
	fs.renameSync(path.resolve(oldName), newPath);
	console.log(`\nProjeto movido para: ${newName}`);
};

// Função principal
async function main(currentFolderName: string) {
	console.log(`\nConfiguração do projeto iniciado.`);

	// Perguntar nome do projeto, autor e descrição
	const projectName = await askQuestion('Nome do projeto: ');
	const author = await askQuestion('Nome do autor: ');
	const description = await askQuestion('Descrição do projeto: ');

	// Atualizar package.json
	const packagePath = path.resolve('package.json');
	const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

	packageJson.name = projectName || currentFolderName;
	packageJson.author = author || 'Anônimo';
	packageJson.description = description || '';
    packageJson.scripts = {
        ...packageJson.scripts,
        "build:injection": `bun bundle.tsx --name ${packageJson.name}`
    }

	// Salvar alterações no package.json
	fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 4));

	// Renomear a pasta do projeto, se necessário
	console.log("Renomeando", {
		projectName,
		currentFolderName,
	});
	if (projectName && projectName !== currentFolderName) {
		try {
			renameProjectFolder(currentFolderName, projectName);
		} catch (error) {
			console.error('Erro ao renomear a pasta:', error);
		}
	}

	console.log('\nProjeto configurado com sucesso!');
	rl.close();
}

// Pegar o nome da pasta atual
const currentFolderName = path.basename(process.cwd());
main(currentFolderName).catch((err) => {
	console.error('Erro durante a configuração:', err);
	rl.close();
});
