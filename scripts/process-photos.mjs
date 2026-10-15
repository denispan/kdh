// scripts/process-photos.mjs
// Мастера фотографий лежат в raw-photos/ (в сборку не попадают).
// Скрипт делает из них веб-версии в public/gallery/photo/:
//   <name>.webp       — до 1600 px по длинной стороне (лайтбокс)
//   <name>.thumb.webp — 640 px по высоте (лента на странице)
// и перезаписывает src/data/photos.ts: размеры и доминирующий цвет для плейсхолдера.
// Запуск: npm run photos:process
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAW_DIR = path.resolve("raw-photos");
const OUT_DIR = path.resolve("public/gallery/photo");
const URL_PREFIX = "/gallery/photo";
const PHOTOS_TS = path.resolve("src/data/photos.ts");

const EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const FULL = { maxSide: 1600, quality: 75 };
const THUMB = { height: 640, quality: 70 };

const sanitizeBaseName = (name) => name.replace(/\s+/g, "_");
const toHex = (n) => n.toString(16).padStart(2, "0");
const rgbToHex = ({ r, g, b }) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;
const encodeUrlPath = (p) => p.split("/").map(encodeURIComponent).join("/");

const listRawFiles = async () => {
  const entries = await fs.readdir(RAW_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && EXT.has(path.extname(e.name).toLowerCase()))
    .map((e) => path.join(RAW_DIR, e.name))
    .sort();
};

const processOne = async (filePath) => {
  const base = sanitizeBaseName(path.parse(filePath).name);
  const fullName = `${base}.webp`;
  const thumbName = `${base}.thumb.webp`;

  const full = await sharp(filePath)
    .rotate()
    .resize({
      width: FULL.maxSide,
      height: FULL.maxSide,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: FULL.quality })
    .toFile(path.join(OUT_DIR, fullName));

  await sharp(filePath)
    .rotate()
    .resize({ height: THUMB.height, fit: "inside", withoutEnlargement: true })
    .webp({ quality: THUMB.quality })
    .toFile(path.join(OUT_DIR, thumbName));

  // Средний цвет кадра — фон плейсхолдера до загрузки картинки.
  const { channels } = await sharp(filePath).stats();
  const [r, g, b] = channels.map((c) => Math.round(c.mean));

  return {
    full: `${URL_PREFIX}/${encodeUrlPath(fullName)}`,
    thumb: `${URL_PREFIX}/${encodeUrlPath(thumbName)}`,
    width: full.width,
    height: full.height,
    color: rgbToHex({ r, g, b }),
  };
};

// Объекты в несколько строк — так файл стабилен для prettier.
const renderPhotosTs = (photos) => {
  const rows = photos.map((p) =>
    [
      "  {",
      `    full: "${p.full}",`,
      `    thumb: "${p.thumb}",`,
      `    width: ${p.width},`,
      `    height: ${p.height},`,
      `    color: "${p.color}",`,
      "  },",
    ].join("\n"),
  );

  return [
    "// Сгенерировано scripts/process-photos.mjs — не править руками, перезапустить npm run photos:process.",
    "export type Photo = {",
    "  full: string;",
    "  thumb: string;",
    "  width: number;",
    "  height: number;",
    "  // Доминирующий цвет — фон плейсхолдера, пока грузится картинка.",
    "  color: string;",
    "};",
    "",
    "export const photos: Photo[] = [",
    ...rows,
    "];",
    "",
  ].join("\n");
};

const main = async () => {
  const files = await listRawFiles();
  if (files.length === 0) {
    console.log(`No images in ${RAW_DIR}`);
    return;
  }

  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  const photos = [];
  for (const file of files) {
    photos.push(await processOne(file));
    console.log(path.basename(file));
  }

  await fs.writeFile(PHOTOS_TS, renderPhotosTs(photos), "utf8");
  console.log(`Photos: ${photos.length} → ${OUT_DIR}`);
  console.log(`Updated: ${PHOTOS_TS}`);
};

await main();
