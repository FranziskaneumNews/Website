import generate from './generator.ts'

function readDir(dir: string) {
    try {
        for (const dirEntry of Deno.readDirSync(dir)) {
            if (dirEntry.isFile) {
                if (dirEntry.name.endsWith('.md')) {
                    generate(`${dir}/${dirEntry.name}`);
                }
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

for (const file of Deno.readDirSync('template')) {
    if (file.isFile && file.name.endsWith('.css')) {
        Deno.copyFileSync(`template/${file.name}`, `html/${file.name}`);
    }
}

// TODO: Auto Downlaod News Repo

readDir("news/articles");