// Обложки, цвета и превью из Apple Music (генерируются scripts/fetch-releases.mjs).
import releasesJson from "./releases.json";

export type Release = {
  id: number;
  title: string;
  releaseDate: string;
  cover: string;
  // Цвет фона обложки — им красится карточка трека.
  color: string;
  // 30-секундное превью (m4a) с CDN Apple.
  preview: string;
  apple: string;
};

// Отсортированы по дате релиза, новые первыми.
export const releases: Release[] = releasesJson;

// Названия в каталоге и в music.ts могут отличаться регистром, «ё» и пунктуацией.
const normalizeTitle = (title: string) =>
  title
    .toLocaleLowerCase("ru")
    .replaceAll("ё", "е")
    .replace(/[^\p{L}\p{N}]+/gu, "");

const byTitle = new Map(releases.map((r) => [normalizeTitle(r.title), r]));

export const findRelease = (title: string): Release | undefined =>
  byTitle.get(normalizeTitle(title));

// Самый свежий релиз среди тех, что есть на сайте (в music.ts).
export const latestRelease = (
  titles: readonly string[],
): Release | undefined => {
  const known = new Set(titles.map(normalizeTitle));
  return releases.find((r) => known.has(normalizeTitle(r.title)));
};
