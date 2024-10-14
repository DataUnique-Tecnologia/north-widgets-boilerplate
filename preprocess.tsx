declare interface String {
    getModule(this: string, mod: string, inject: string): string
    injectPrepareModule(this: string, mod: string): string
}

String.prototype.getModule = function(this: string, mod: string, inject: string){
    return this.replace(moduleTransform(mod), (_, token) => {
        token = token.replace(/(\w)\s+as\s+(\w)/gm, '$1: $2');
        return `const ${token} = Injection.${inject};`;
    });
}

String.prototype.injectPrepareModule = function(this, mod){
    return 'function _prepareModule(Injection){\n'
        + this
        + '\n\treturn '.concat(mod).concat(';')
        + '\n};'
        + '\n\nexport default _prepareModule;';
}

const moduleTransform = (mod: string) => new RegExp(`import\\s*\\*?\\s*(?:as)?\\s*(.+?)from\\s*['"]${mod}['"].*`, "gm");