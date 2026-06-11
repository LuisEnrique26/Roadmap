import * as fs from 'node:fs';
import * as path from 'node:path';
import { pipeline } from 'node:stream/promises';

function generarArchivoPesado() {
    const filePath = path.join(process.cwd(), 'inventario_masivo.txt');
    const writeStream = fs.createWriteStream(filePath);
    
    for(let i = 0; i < 1_000_000; i++) {
        writeStream.write(`Registro ${i}: Movimiento de inventario - ID ${Math.random()}\n`);
    }
    writeStream.end();
    console.log("Archivo pesado generado.");
}

//generarArchivoPesado();

async function processBystreams() {
    const readStream = fs.createReadStream(path.join(process.cwd(), 'inventario_masivo.txt'));
    const writeStream = fs.createWriteStream(path.join(process.cwd(), 'inventario_procesado.txt'));
    let count = 0;

    try {
        await pipeline(readStream.on("data", () => count++), writeStream);
        console.log(`Se procesaron ${count} chunks`);
    } catch (e) {
        console.error(e);
    }
}

processBystreams();