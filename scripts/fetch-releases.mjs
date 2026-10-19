// scripts/fetch-releases.mjs
// Забирает из публичного iTunes Search API обложки и 30-секундные превью
// всех треков артиста и складывает их в:
//   public/covers/<trackId>.webp  — обложка 480×480
//   src/data/releases.json        — список релизов (title, cover, preview, apple)
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

  return `/covers/${fileName}`;
};

const main = async () => {
  await fs.mkdir(COVERS_DIR, { recursive: true });

  const res = await fetchOk(SEARCH_URL);
  const { results } = await res.json();
  const own = results.filter(isOwnTrack);

  const releases = [];
  for (const track of own) {
    const cover = await processCover(track);
    releases.push({
      id: track.trackId,
      title: track.trackName,
      releaseDate: track.releaseDate,
      cover,
      preview: track.previewUrl,
      apple: track.trackViewUrl,
    });
    console.log(track.trackName);
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
