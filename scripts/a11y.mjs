// Runs axe against both pre-rendered pages at both design widths.
// Fails on any serious or critical issue, per AGENTS.md "Done means".
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const PORT = 4178;

const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain',
};

const server = createServer(async (req, res) => {
  const url = (req.url ?? '/').split('?')[0];
  const candidates = [join(dist, url), join(dist, url, 'index.html'), join(dist, 'index.html')];
  for (const file of candidates) {
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
      return res.end(body);
    } catch {
      /* try the next candidate */
    }
  }
  res.writeHead(404).end('not found');
});

await new Promise((r) => server.listen(PORT, r));

const viewports = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1280, height: 900 },
};
const pages = ['/', '/cowboys-radiator'];

const browser = await chromium.launch();
let bad = 0;

for (const path of pages) {
  for (const [name, viewport] of Object.entries(viewports)) {
    // axe-core/playwright requires an explicit context, not browser.newPage().
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'load' });
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const serious = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    const label = `${path} @ ${name}`;
    if (serious.length === 0) {
      console.log(`  ok    ${label} (${violations.length} minor/moderate)`);
    } else {
      bad += serious.length;
      console.error(`  FAIL  ${label}`);
      for (const v of serious) {
        console.error(`        [${v.impact}] ${v.id}: ${v.help}`);
        for (const n of v.nodes.slice(0, 3)) console.error(`          ${n.target.join(' ')}`);
      }
    }
    await context.close();
  }
}

await browser.close();
server.close();

if (bad > 0) {
  console.error(`\n${bad} serious or critical issue(s).`);
  process.exit(1);
}
console.log('\nNo serious or critical axe issues.');
