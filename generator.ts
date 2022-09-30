import { render } from "https://deno.land/x/gfm/mod.ts";

export default function generate(filename: string) {
    console.log(filename)
    const text = Deno.readTextFileSync(filename);

    const articlename = filename.split("-").slice(3).join("-").replace(".md", "");

    const template = Deno.readTextFileSync('template/index.html');
    const html = template.replace('{{ content }}', render(text)).replace('{{ title }}', articlename);

    Deno.mkdirSync(`html/${filename.replace('news/', '').split('/').slice(0, -1).join('/')}`, { recursive: true });
    Deno.writeTextFileSync(`html/${filename.replace('news/', '').replace('.md', '')}.html`, html, { create: true });
}