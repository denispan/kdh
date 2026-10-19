// Иконка и подпись площадки — общие для всех треков, ссылка у каждого трека своя.
export const platforms = [
  { key: "yandex", label: "Yandex Music", iconSrc: "/icons/yandex-music.png" },
  { key: "vk", label: "VK Music", iconSrc: "/icons/vk-music.png" },
  { key: "zvuk", label: "Звук", iconSrc: "/icons/zvuk-music.png" },
  { key: "mts", label: "МТС Music", iconSrc: "/icons/mts-music.png" },
] as const;

export type Track = {
  title: string;
  // Запасная картинка, если обложки нет в releases.json.
  colorLogo: string;
  // Исполнитель оригинала — выводится в карточке как «оригинал — …».
  original?: string;
  // Ключ площадки → ссылка. Площадки без ссылки просто не выводятся.
  links: Partial<Record<(typeof platforms)[number]["key"], string>>;
};

export const tracks: Track[] = [
  {
    title: "Где-то",
    colorLogo: "/logo-color/blue-pink.png",
    links: {
      yandex: "https://music.yandex.ru/album/33837156/track/132484680",
      vk: "https://music.vk.com/link/de4z1",
      zvuk: "https://zvuk.com/track/141007451",
      mts: "https://music.mts.ru/album/33837156/track/132484680",
    },
  },
  {
    title: "Ты сделана из огня",
    colorLogo: "/logo-color/red.png",
    links: {
      yandex: "https://music.yandex.ru/album/33940222/track/132741393",
      vk: "https://music.vk.com/link/wloVP",
      zvuk: "https://zvuk.com/track/141104802",
      mts: "https://music.mts.ru/album/33940222/track/132741393",
    },
  },
  {
    title: "Если ты со мной",
    colorLogo: "/logo-color/blue.png",
    links: {
      yandex: "https://music.yandex.ru/album/38883204/track/144488599",
      vk: "https://vk.ru/music/album/-2000662374_25662374",
      zvuk: "https://zvuk.com/track/163509869",
      mts: "https://music.mts.ru/album/38883204/track/144488599",
    },
  },
  {
    title: "Мой ненаглядный",
    colorLogo: "/logo-color/pink.png",
    links: {
      yandex: "https://music.yandex.ru/album/33594159/track/131901454",
      vk: "https://music.vk.com/link/0jbML",
      zvuk: "https://zvuk.com/track/140504845",
      mts: "https://music.mts.ru/album/33594159/track/131901454",
    },
  },
  {
    title: "Желанная",
    colorLogo: "/logo-color/green.png",
    links: {
      yandex: "https://music.yandex.ru/album/38901543/track/144527798",
      vk: "https://vk.ru/audio-2001130038_144130038",
      zvuk: "https://zvuk.com/track/163899829",
      mts: "https://music.mts.ru/album/38901543/track/144527798",
    },
  },
  {
    title: "Ребята с нашего двора",
    colorLogo: "/logo-color/purple.png",
    original: "Любэ",
    links: {
      yandex: "https://music.yandex.ru/album/33837162/track/132484708",
      vk: "https://vk.ru/audio-2001920225_131920225",
      zvuk: "https://zvuk.com/track/141007239",
      mts: "https://music.mts.ru/album/33837162/track/132484708",
    },
  },
  {
    title: "Облака",
    colorLogo: "/logo-color/orange.png",
    links: {
      yandex: "https://music.yandex.ru/album/33835702/track/132481407",
      vk: "https://music.vk.com/link/Iq4dw",
      zvuk: "https://zvuk.com/track/141004086",
      mts: "https://music.mts.ru/album/33835702/track/132481407",
    },
  },
  {
    title: "Никто не услышит",
    colorLogo: "/logo-color/yellow.png",
    links: {
      yandex: "https://music.yandex.ru/album/33613156/track/131947849",
      vk: "https://music.vk.com/link/dnQZL",
      zvuk: "https://zvuk.com/track/140510250",
      mts: "https://music.mts.ru/album/33613156/track/131947849",
    },
  },
  {
    title: "Нарисуй мне небо",
    colorLogo: "/logo-color/mint.png",
    original: "Ёлка",
    links: {
      yandex: "https://music.yandex.ru/album/33629772/track/131990035",
      vk: "https://music.vk.com/link/mZkXE",
      zvuk: "https://zvuk.com/track/140527061",
      mts: "https://music.mts.ru/album/33629772/track/131990035",
    },
  },
  {
    title: "Ледяное сердце",
    colorLogo: "/logo-color/pink-purple.png",
    links: {
      yandex: "https://music.yandex.ru/album/38883202/track/144488595",
      vk: "https://vk.ru/music/playlist/-2000662384_25662384_5103d68800453e47aa",
      zvuk: "https://zvuk.com/track/163509873",
      mts: "https://music.mts.ru/album/38883202/track/144488595",
    },
  },
  {
    title: "У тебя есть я",
    colorLogo: "/logo-color/pink-yellow.png",
    links: {
      yandex: "https://music.yandex.ru/album/38884401/track/144490731",
      vk: "https://vk.ru/music/playlist/-2000663295_25663295_6086e9ce2974a6324f",
      zvuk: "https://zvuk.com/track/163494382",
      mts: "https://music.mts.ru/album/38884401/track/144490731",
    },
  },
  {
    title: "Ничего не бойся",
    colorLogo: "/logo-color/multifruct.png",
    links: {
      yandex: "https://music.yandex.ru/album/33837154/track/132484679",
      vk: "https://music.vk.com/link/c5Tss",
      zvuk: "https://zvuk.com/track/141007453",
      mts: "https://music.mts.ru/album/33837154/track/132484679",
    },
  },
  {
    title: "Штрихи",
    colorLogo: "/logo-color/yellow.png",
    links: {
      yandex: "https://music.yandex.ru/album/33837161/track/132484707",
      vk: "https://music.vk.com/link/jqS8r",
      zvuk: "https://zvuk.com/track/141008225",
      mts: "https://music.mts.ru/album/33837161/track/132484707",
    },
  },
  {
    title: "Гудбай, Америка",
    colorLogo: "/logo-color/blue.png",
    original: "Наутилус Помпилиус",
    links: {
      yandex: "https://music.yandex.ru/album/33837160/track/132484706",
      vk: "https://vk.ru/music/playlist/-2000339026_22339026_8ce181924d9b6bc156",
      zvuk: "https://zvuk.com/track/141008212",
      mts: "https://music.mts.ru/album/33837160/track/132484706",
    },
  },
  {
    title: "Выше",
    colorLogo: "/logo-color/mint.png",
    links: {
      yandex: "https://music.yandex.ru/album/38788512/track/144294646",
      vk: "https://vk.ru/music/playlist/-2000610062_25610062_36408df71804312cf6",
      zvuk: "https://zvuk.com/track/161280089",
      mts: "https://music.mts.ru/album/38788512/track/144294646",
    },
  },
  {
    title: "Туда",
    colorLogo: "/logo-color/purple.png",
    links: {
      yandex: "https://music.yandex.ru/album/38788513/track/144294650",
      vk: "https://vk.ru/music/playlist/-2000610076_25610076_b92bf63bdbba4742a9",
      zvuk: "https://zvuk.com/track/161286738",
      mts: "https://music.mts.ru/album/38788513/track/144294650",
    },
  },
  {
    title: "Всё, что в жизни есть у меня",
    colorLogo: "/logo-color/green.png",
    original: "Самоцветы",
    links: {
      yandex: "https://music.yandex.ru/album/38804764/track/144327013",
      vk: "https://vk.ru/music/playlist/-2000619934_25619934_a0beb8caedd131a15f",
      zvuk: "https://zvuk.com/track/161593280",
      mts: "https://music.mts.ru/album/38804764/track/144327013",
    },
  },
  {
    title: "Грею счастье",
    colorLogo: "/logo-color/orange.png",
    links: {
      yandex: "https://music.yandex.ru/album/38883201/track/144488594",
      vk: "https://vk.ru/music/playlist/-2000662326_25662326_4e37067eb937d3a3bc",
      zvuk: "https://zvuk.com/track/163552851",
      mts: "https://music.mts.ru/album/38883201/track/144488594",
    },
  },
  {
    title: "Единственная",
    colorLogo: "/logo-color/pink.png",
    links: {
      yandex: "https://music.yandex.ru/album/42551366/track/152443999",
      vk: "https://vk.ru/music/playlist/-2000025327_28025327_b78a87de8f5a018c53",
      zvuk: "https://zvuk.com/track/182309820",
      mts: "https://music.mts.ru/album/42551366/track/152443999",
    },
  },
  {
    title: "Кровь горячая",
    colorLogo: "/logo-color/red.png",
    links: {
      yandex: "https://music.yandex.ru/album/43101043/track/153737062",
      vk: "https://vk.ru/music/playlist/-2000511981_28511981_bdc8c43f8adcdcfd26",
      zvuk: "https://zvuk.com/track/184266065",
      mts: "https://music.mts.ru/album/43101043/track/153737062",
    },
  },
];
