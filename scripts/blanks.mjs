// Prints the open blanks without a full build, and rewrites the table in
// docs/OPEN-BLANKS.md so the doc never drifts from the content file.
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const server = await createServer({
  root,
  configFile: false,
  appType: 'custom',
  server: { middlewareMode: true },
  // Nothing is served here; we only need the module graph to read content.
  optimizeDeps: { noDiscovery: true },
  esbuild: { jsx: 'automatic' },
});
const { openBlanks } = await server.ssrLoadModule('/src/content/index.ts');
const all = openBlanks();
await server.close();

const rows = [...all.gts, ...all.cowboys];
const table = [
  '| # | Where | What we need |',
  '|---|---|---|',
  ...rows.map((b, i) => `| ${i + 1} | \`${b.path}\` | ${b.need} |`),
].join('\n');

const path = join(root, 'docs/OPEN-BLANKS.md');
const doc = await readFile(path, 'utf8');
const next = doc.replace(
  /<!-- blanks:start -->[\s\S]*<!-- blanks:end -->/,
  `<!-- blanks:start -->\n${table}\n<!-- blanks:end -->`,
);
await writeFile(path, next, 'utf8');
console.log(`${rows.length} open blanks; docs/OPEN-BLANKS.md updated`);
for (const b of rows) console.log(`  - ${b.path.padEnd(42)} ${b.need}`);
