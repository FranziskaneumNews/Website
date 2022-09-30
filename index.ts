import generate from './generator.ts'

function readDir(dir: string) {
    try {
        for (const dirEntry of Deno.readDirSync("news")) {
            if (dirEntry.isFile) {
                generate(dirEntry.name);
            } else if (dirEntry.isDirectory) {
                readDir(`${dir}/${dirEntry.name}`);
            }
        }
    } catch (e) {
        if (e instanceof Deno.errors.NotFound) {
            console.log('Make sure you cloned the News repo into news/');
        }
        console.log(e);
    }
}

readDir("news");