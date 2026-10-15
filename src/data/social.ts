// Официальные страницы проекта. Ключ `icon` — имя иконки в components/SocialIcon.astro.
export type SocialIcon = "vk" | "telegram" | "youtube" | "ok";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

export const socialLinks: SocialLink[] = [
  { label: "ВКонтакте", href: "https://vk.com/hit_kazak", icon: "vk" },
  { label: "Telegram", href: "https://t.me/kazaki_hit", icon: "telegram" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@kazakidelauthits",
    icon: "youtube",
  },
  {
    label: "Одноклассники",
    href: "https://ok.ru/group/70000009087712",
    icon: "ok",
  },
];

// Страницы артиста на стриминговых площадках — для футера и JSON-LD.
export type StreamingLink = {
  label: string;
  href: string;
  iconSrc?: string;
};

export const streamingLinks: StreamingLink[] = [
  {
    label: "Яндекс Музыка",
    href: "https://music.yandex.ru/artist/23134050",
    iconSrc: "/icons/yandex-music.png",
  },
  {
    label: "Звук",
    href: "https://zvuk.com/artist/213068643",
    iconSrc: "/icons/zvuk-music.png",
  },
  {
    label: "МТС Музыка",
    href: "https://music.mts.ru/artist/23134050",
    iconSrc: "/icons/mts-music.png",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/ru/artist/1772898201",
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/1Em23NcWtCEQM7vi4a1fMc",
  },
];

// Все клипы — раздел «Видео» сообщества ВКонтакте.
export const allVideosHref = "https://vk.com/video/@hit_kazak";
