/**
 * Re-encode event photos to web-sized WebP.
 *
 * Usage:  node scripts/optimize-photos.mjs <event-folder> <output-prefix>
 * Example: node scripts/optimize-photos.mjs reactor4 rc4
 *
 * Originals are moved to public/images/_originals/<event-folder>/ (gitignored)
 * and the re-encoded files are written back into public/images/<event-folder>/
 * as <output-prefix>-1.webp, <output-prefix>-2.webp, ...
 */
import { readdir, mkdir, rename, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const MAX_EDGE = 2000;
const QUALITY = 82;

const [folder, prefix] = process.argv.slice(2);
if (!folder || !prefix) {
  console.error("usage: node scripts/optimize-photos.mjs <event-folder> <output-prefix>");
  process.exit(1);
}

const publicDir = join("public", "images", folder);
const originalsDir = join("public", "images", "_originals", folder);

await mkdir(originalsDir, { recursive: true });

/* photos land here as "rc4 (7).jpg" — sort by that number so the gallery
   order matches the order the camera produced them, not lexicographic order */
const numberIn = (name) => {
  const match = name.match(/(\d+)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const sources = (await readdir(publicDir))
  .filter((name) => /\.(jpe?g|png)$/i.test(name))
  .sort((a, b) => numberIn(a) - numberIn(b));

if (sources.length === 0) {
  console.error(`no source photos in ${publicDir}`);
  process.exit(1);
}

// move originals out first, so a re-run never re-encodes its own output
const moved = [];
for (const name of sources) {
  const target = join(originalsDir, name);
  await rename(join(publicDir, name), target);
  moved.push(target);
}

let totalIn = 0;
let totalOut = 0;

for (const [index, source] of moved.entries()) {
  const out = join(publicDir, `${prefix}-${index + 1}.webp`);
  await sharp(source)
    .rotate()
    .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);

  totalIn += (await stat(source)).size;
  totalOut += (await stat(out)).size;
  process.stdout.write(`\r${index + 1}/${moved.length}`);
}

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(`\n${moved.length} photos: ${mb(totalIn)} MB -> ${mb(totalOut)} MB`);
