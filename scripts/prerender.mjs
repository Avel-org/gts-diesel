// Pre-renders every route to static HTML (hard rule 6: the H1, phone number and
// address are in the built file before any JavaScript runs), then prints the
// open blanks so nobody ships a page without knowing what is still missing.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');

const { render, openBlanks } = await import(
  pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href
);

const template = await readFile(join(dist, 'index.html'), 'utf8');

for (const url of ['/', '/cowboys-radiator', '/404']) {
  const { html, head } = render(url);
  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
  // /404 becomes dist/404.html, which static hosts serve for unmatched paths.
  const out =
    url === '/'
      ? join(dist, 'index.html')
      : url === '/404'
        ? join(dist, '404.html')
        : join(dist, url.slice(1), 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, page, 'utf8');
  console.log(`  pre-rendered ${url.padEnd(18)} -> ${out.replace(`${root}/`, '')}`);
}

const all = openBlanks();
const lines = [...all.gts, ...all.cowboys, ...all.questions];
console.log(`\n  Open blanks (${lines.length}) — see docs/OPEN-BLANKS.md:`);
for (const b of lines) console.log(`    - ${b.path.padEnd(42)} ${b.need}`);
