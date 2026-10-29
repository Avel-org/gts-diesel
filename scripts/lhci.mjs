// Runs Lighthouse CI, then clears the Chrome profile directory it leaks here.
//
// chrome-launcher detects WSL and takes its Windows temp-dir path, but then
// hands that Windows-format path to a POSIX mkdtemp. The path is relative as
// far as Linux is concerned, so every Chrome launch creates a directory called
// `C:\Users\…\lighthouse.XXXXXX` in the working directory — six of them per
// run. The WSL branch overwrites process.env.TEMP itself, so setting TEMP or
// TMPDIR before the run does not prevent it. Sweeping afterwards does.
import { spawnSync } from 'node:child_process';
import { readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const leaked = () =>
  readdirSync(root).filter((e) => e.startsWith('C:') || e.startsWith('lighthouse.'));

const result = spawnSync('lhci', ['autorun', ...process.argv.slice(2)], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
});

const junk = leaked();
for (const dir of junk) rmSync(join(root, dir), { recursive: true, force: true });
if (junk.length > 0) console.log(`\n  cleaned ${junk.length} leaked Chrome profile dir(s)`);

process.exit(result.status ?? 1);
