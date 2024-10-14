import "./preprocess";
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import Bun from 'bun';

if(process.argv[2] !== "--name") throw new Error('Missing --name argument');
if(typeof process.argv[3] !== 'string' && !process.argv[3]) throw new Error('--name argument must be the project name');
if(process.argv[3] === "<PROJECT_NAME>") throw new Error("Wrong boilerplate construction");

async function buildNTransform() {
    const file_name = "widget.js";
    const entrypoints = ['js/widget.tsx'];
    const outdir = `src/${process.argv[3]}/static`;

    await Bun.build({
        entrypoints,
        minify: true,
        outdir,
        naming: "[name].[ext]",
        format: "esm",
        external: [
            "react",
            "react-dom/client",
            "antd",
            '@emotion/react',
            '@emotion/styled',
            '@blocknote/core',
            '@blocknote/mantine',
            '@blocknote/react',
        ],
    });

    const content = await readFile(join(outdir, file_name)).then(r => r.toString('utf8'));
    const transformedContent = resolveImports(content);
    await writeFile(join(outdir, file_name), transformedContent, "utf8");
}

function resolveImports(text: string): string{
    const export_pattern = /export\s*\{(?:.|\n)*?(?<module>\w+)\s+as\s+default(?:.|\n)*?\}.*/;
    const ext_mod = text.match(export_pattern)?.groups?.module??'';

    return text
        .replace(/import.*?from.*?;/g, '\n$&\n')
        .replace(export_pattern, '')
        .getModule('react', 'React')
        .getModule('react-dom/client', 'ReactDOM')
        .getModule('antd', 'AntD')
        .getModule('@emotion/react', 'EmotionReact')
        .getModule('@emotion/styled', 'EmotionStyled')
        .getModule('@blocknote/core', 'BlockNoteCore')
        .getModule('@blocknote/mantine', 'BlockNoteMantine')
        .getModule('@blocknote/react', 'BlockNoteReact')
        .injectPrepareModule(ext_mod);
}


await buildNTransform();

export {};