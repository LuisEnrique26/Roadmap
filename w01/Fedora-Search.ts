import * as fs from "node:fs";
import * as path from "node:path";

// Creamos el CacheManager
class CacheManager {
    private readonly store = new Map<string, string>();

    set(key: string, value: string) {
        this.store.set(key, value);
    }

    get(key: string): string | undefined {
        return this.store.get(key);
    }

    getAll(): Map<string, string> {
        return this.store;
    }

    clearCache() {
        this.store.clear();
    }
}

// Creamos la instancia
const manager = new CacheManager();

// Creamos la función recursiva para recorrer el directorio y guardar los archivos
function searchAndStoreFiles(dirPath: string) {
    for(const file of fs.readdirSync(dirPath)) {
        const absolutePath = path.join(dirPath, file);
        if (fs.statSync(absolutePath).isDirectory()) {
            searchAndStoreFiles(absolutePath);
        } else {
            manager.set(file, absolutePath);
        }
    }

    return manager;
}

// Extraemos el parametro que escribimos en la consola
const targetPath = process.argv[2];

if (!targetPath) {
    console.error("Please provide a target path");
    process.exit(1);
}

console.log(`> Indexing directory: ${targetPath}...`);
searchAndStoreFiles(targetPath);
console.log(`> ¡Indexing complete! Found ${manager.getAll().size} files.`);

const fileLooking = "132928769.jpg";
console.time(`Looking for ${fileLooking}`);

const result = manager.get(fileLooking);

if (result) {
    console.log(`Found in: ${result}`);
} else {
    console.log(`Not found in: ${targetPath}`);
}
console.timeEnd(`Looking for ${fileLooking}`);

manager.clearCache();