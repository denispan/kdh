// Относительная яркость цвета (WCAG) — чтобы выбрать тёмный или светлый текст на цветном фоне.
const srgbToLinear = (channel: number) => {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

export const hexToRgb = (hex: string): [number, number, number] => {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return [r, g, b];
};

export const relativeLuminance = (hex: string): number => {
  const [r, g, b] = hexToRgb(hex);
  return (
    0.2126 * srgbToLinear(r) +
    0.7152 * srgbToLinear(g) +
    0.0722 * srgbToLinear(b)
  );
};

// Порог подобран на глаз под обложки: жёлтый и голубой — светлые, синий и чёрный — тёмные.
export const isLightColor = (hex: string): boolean =>
  relativeLuminance(hex) > 0.35;
