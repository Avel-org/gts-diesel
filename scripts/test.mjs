// The brief's checks call `pnpm test -- <pattern>` (CK4 to CK15). pnpm forwards
// the bare `--`, and vitest then ignores the pattern and runs everything — so
// those checks would silently pass on an unrelated suite. Drop the separator
// and hand the rest to vitest.
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2).filter((a) => a !== '--');
const r = spawnSync('vitest', ['run', ...args], { stdio: 'inherit', shell: true });
process.exit(r.status ?? 1);
