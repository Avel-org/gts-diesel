// Builds the responsive photo ladder and the header logo from the best sources
// we have. Runs before `vite build` (see package.json) and on its own as
// `pnpm images`.
//
// Sources: public/uploads/<name>.jpg — Mathew's photos, 800px wide at most.
// No better originals exist, so we never upscale past the source width.
//
// Outputs, per photo and width (400, 640, 800, capped at the source width):
//   <name>-<width>.avif  quality 55
//   <name>-<width>.webp  quality 82
// The 640 and 800 rungs get a light sharpen (sigma 0.6). sharp writes no
// metadata unless asked, so EXIF, GPS, XMP and ICC are all stripped. The JPEG
// stays as the last-resort fallback for the <img> src.
//
// Logo: gts-logo-white-on-ink.png has padding baked in; the header uses a
// trimmed copy (gts-logo-header.png + .webp).
//
// Output is deterministic, and a file is only rewritten when its bytes change,
// so running this in every build leaves the working tree clean.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const uploads = join(root, 'public', 'uploads');

export const PHOTOS = [
  'service-truck-yard',
  'trailer-crane',
  'roadside-brake-job',
  'engine-out',
  'semi-hood-up',
];
export const WIDTHS = [400, 640, 800];
const SHARPEN_FROM = 640;

let written = 0;
let unchanged = 0;
function put(path, buf) {
  if (existsSync(path) && readFileSync(path).equals(buf)) {
    unchanged++;
    return;
  }
  writeFileSync(path, buf);
  written++;
}

for (const name of PHOTOS) {
  const src = join(uploads, `${name}.jpg`);
  const { width: srcW } = await sharp(src).metadata();
  if (!srcW) throw new Error(`${name}.jpg: no width`);
  for (const w of WIDTHS.filter((w) => w <= srcW)) {
    let img = sharp(src).rotate().resize({ width: w, withoutEnlargement: true });
    if (w >= SHARPEN_FROM) img = img.sharpen({ sigma: 0.6 });
    put(join(uploads, `${name}-${w}.avif`), await img.clone().avif({ quality: 55, effort: 6 }).toBuffer());
    put(join(uploads, `${name}-${w}.webp`), await img.clone().webp({ quality: 82, effort: 6 }).toBuffer());
  }
}

// Trim against the top-left pixel (the ink ground), keep the rest as is.
const logo = sharp(join(uploads, 'gts-logo-white-on-ink.png')).trim({ threshold: 10 });
const logoPng = await logo.clone().png({ compressionLevel: 9 }).toBuffer();
put(join(uploads, 'gts-logo-header.png'), logoPng);
put(join(uploads, 'gts-logo-header.webp'), await sharp(logoPng).webp({ lossless: true }).toBuffer());

console.log(`images: ${written} written, ${unchanged} unchanged`);
