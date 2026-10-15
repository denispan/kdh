// scripts/fetch-releases.mjs
// Забирает из публичного iTunes Search API обложки, цвета и 30-секундные превью
// всех треков артиста и складывает их в:
//   public/covers/<trackId>.webp  — обложка 480×480
//   src/data/releases.json        — список релизов (title, cover, color, preview, apple)
// Запуск: npm run releases:fetch
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ARTIST = "КАЗАКИ ДЕЛАЮТ ХИТЫ";
const SEARCH_URL = `https://itunes.apple.com/search?term=${encodeURIComponent(ARTIST)}&country=ru&entity=song&limit=200`;
const COVERS_DIR = path.resolve("public/covers");
const OUT_JSON = path.resolve("src/data/releases.json");
const COVER_SIZE = 480;
const COVER_QUALITY = 82;

const toHex = (n) => n.toString(16).padStart(2, "0");
const rgbToHex = ({ r, g, b }) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;

const fetchOk = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res;
};

const isOwnTrack = (result) =>
  result.wrapperType === "track" &&
  result.artistName.toLocaleLowerCase("ru") === ARTIST.toLocaleLowerCase("ru");

// Цвет фона обложки — среднее по маленькому квадрату у самого правого верхнего
// угла: там у всех обложек чистая заливка (слева бейдж ПФКИ, ниже — тень логотипа).
const backgroundColor = async (source) => {
  const { width = COVER_SIZE } = await sharp(source).metadata();
  const sample = Math.round(width / 25);
  const margin = Math.round(width / 75);
  // stats() считается по исходнику и игнорирует extract — поэтому сначала вырезаем угол в буфер.
  const corner = await sharp(source)
    .extract({
      left: width - sample - margin,
      top: margin,
      width: sample,
      height: sample,
    })
    .toBuffer();
  const { channels } = await sharp(corner).stats();
  const [r, g, b] = channels.map((c) => Math.round(c.mean));
  return rgbToHex({ r, g, b });
};

// Обложка: в API лежит 100×100, но тот же путь отдаёт и 600×600.
const processCover = async (track) => {
  const sourceUrl = track.artworkUrl100.replace("100x100bb", "600x600bb");
  const res = await fetchOk(sourceUrl);
  const source = Buffer.from(await res.arrayBuffer());
  const fileName = `${track.trackId}.webp`;

  await sharp(source)
    .resize(COVER_SIZE, COVER_SIZE)
    .webp({ quality: COVER_QUALITY })
    .toFile(path.join(COVERS_DIR, fileName));

  return { cover: `/covers/${fileName}`, color: await backgroundColor(source) };
};

const main = async () => {
  await fs.mkdir(COVERS_DIR, { recursive: true });

  const res = await fetchOk(SEARCH_URL);
  const { results } = await res.json();
  const own = results.filter(isOwnTrack);

  const releases = [];
  for (const track of own) {
    const { cover, color } = await processCover(track);
    releases.push({
      id: track.trackId,
      title: track.trackName,
      releaseDate: track.releaseDate,
      cover,
      color,
      preview: track.previewUrl,
      apple: track.trackViewUrl,
    });
    console.log(`${track.trackName} → ${color}`);
  }

  releases.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  await fs.writeFile(
    OUT_JSON,
    `${JSON.stringify(releases, null, 2)}\n`,
    "utf8",
  );

  console.log(`Releases: ${releases.length} → ${OUT_JSON}`);
};

await main();
