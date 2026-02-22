// scripts/process-photos.mjs
import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import sharp from "sharp";

const RAW_DIR = path.resolve("public/gallery/photo_raw");
const OUT_DIR = path.resolve("public/gallery/photo");
const URL_PREFIX = "/gallery/photo";
const PHOTOS_TS = path.resolve("src/data/photos.ts");

const EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const QUALITY = 90;
const SCALE = 0.5;

const sanitizeBaseName = (name) => name.replace(/\s+/g, "_");

const uniquePath = async (p) => {
  try {
    await fs.access(p);
  } catch {
    return p;
  }
  const dir = path.dirname(p);
  const ext = path.extname(p);
  const base = path.basename(p, ext);
  for (let i = 2; i < 10_000; i++) {
    const candidate = path.join(dir, `${base}_${i}${ext}`);
    try {
      await fs.access(candidate);
    } catch {
      return candidate;
    }
  }
  throw new Error(`Cannot find unique name for: ${p}`);
};

const renameIfHasSpaces = async (fp) => {
  const dir = path.dirname(fp);
  const ext = path.extname(fp);
  const base = path.basename(fp, ext);
  if (!/\s/.test(base)) return fp;

  const newBase = sanitizeBaseName(base);
  let newPath = path.join(dir, `${newBase}${ext}`);
  if (newPath === fp) return fp;

  newPath = await uniquePath(newPath);
  await fs.rename(fp, newPath);
  return newPath;
};

const listRawFiles = async () => {
  const entries = await fs.readdir(RAW_DIR, { withFileTypes: true }).catch(() => []);
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((n) => EXT.has(path.extname(n).toLowerCase()))
    .map((n) => path.join(RAW_DIR, n));
};

const encodeUrlPath = (p) => p.split("/").map(encodeURIComponent).join("/");

const readExistingPhotos = async () => {
  try {
    const src = await fs.readFile(PHOTOS_TS, "utf8");
    const m = src.match(/export const photos\s*=\s*\[([\s\S]*?)\]\s*as const\s*;?/);
    if (!m) return [];
    const body = m[1];
    return [...body.matchAll(/["'`](.*?)["'`]/g)].map((x) => x[1]).filter(Boolean);
  } catch {
    return [];
  }
};

const writePhotosTs = async (list) => {
  await fs.mkdir(path.dirname(PHOTOS_TS), { recursive: true });
  const lines = list.map((p) => `  "${p}",`).join("\n");
  const content = `export const photos = [\n${lines}\n] as const;\n`;
  await fs.writeFile(PHOTOS_TS, content, "utf8");
};

const main = async () => {
  await fs.mkdir(OUT_DIR, { recursive: true });

  let files = await listRawFiles();
  if (!files.length) {
    console.log(`No images found in ${RAW_DIR}`);
    return;
  }

  files = await Promise.all(files.map(renameIfHasSpaces));

  const newUrls = [];

  for (const fp of files) {
    const meta = await sharp(fp).metadata();
    if (!meta.width || !meta.height) {
      console.warn(`Skip (cannot read size): ${fp}`);
      continue;
    }

    const w = Math.max(1, Math.round(meta.width * SCALE));
    const h = Math.max(1, Math.round(meta.height * SCALE));

    const outBase = sanitizeBaseName(path.parse(fp).name);
    const outName = `${outBase}.webp`;
    const outPath = path.join(OUT_DIR, outName);

    await sharp(fp)
      .resize(w, h, { fit: "fill" })
      .webp({ quality: QUALITY })
      .toFile(outPath);

    newUrls.push(`${URL_PREFIX}/${encodeUrlPath(outName)}`);
  }

  const existing = await readExistingPhotos();
  const set = new Set(existing);
  const merged = [...existing];

  for (const u of newUrls) {
    if (!set.has(u)) {
      set.add(u);
      merged.push(u);
    }
  }

  await writePhotosTs(merged);

  const rl = readline.createInterface({ input, output });
  const ans = (await rl.question(`Delete originals from ${RAW_DIR}? [Y/n] `)).trim().toLowerCase();
  rl.close();

  const shouldDelete = ans === "" || ans === "y" || ans === "yes";
  if (shouldDelete) {
    await Promise.all(files.map((fp) => fs.unlink(fp)));
    console.log(`Deleted ${files.length} originals.`);
  } else {
    console.log("Originals kept.");
  }

  console.log(`Optimized: ${newUrls.length}`);
  console.log(`Output dir: ${OUT_DIR}`);
  console.log(`Updated: ${PHOTOS_TS}`);
};

await main();