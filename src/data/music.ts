// Иконка и подпись площадки — общие для всех треков, ссылка у каждого трека своя.
export const platforms = [
  { key: "yandex", label: "Yandex Music", iconSrc: "/icons/yandex-music.png" },
  { key: "vk", label: "VK Music", iconSrc: "/icons/vk-music.png" },
  { key: "zvuk", label: "Звук", iconSrc: "/icons/zvuk-music.png" },
  { key: "mts", label: "МТС Music", iconSrc: "/icons/mts-music.png" },
] as const;

export type Track = {
  title: string;
  colorLogo: string;
  // Ключ площадки → ссылка. Площадки без ссылки просто не выводятся.
  links: Partial<Record<typeof platforms[number]["key"], string>>;
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
      vk: "",
      zvuk: "",
      mts: "https://music.mts.ru/album/38883202/track/144488595",
    },
  },
  {
    title: "У тебя есть я",
    colorLogo: "/logo-color/pink-yellow.png",
    links: {
      yandex: "https://music.yandex.ru/album/38884401/track/144490731",
      vk: "",
      zvuk: "",
      mts: "https://music.mts.ru/album/38884401/track/144490731",
    },
  },
  {
    title: "Ничего не бойся",
    colorLogo: "/logo-color/multifruct.png",
    links: {
      yandex: "https://music.yandex.ru/album/33837154/track/132484679",
      vk: "https://music.vk.com/link/c5Tss",
      zvuk: "",
      mts: "https://music.mts.ru/album/33837154/track/132484679",
    },
  },
  {
    title: "Штрихи",
    colorLogo: "/logo-color/yellow.png",
    links: {
      yandex: "https://music.yandex.ru/album/33837161/track/132484707",
      vk: "https://music.vk.com/link/jqS8r",
      zvuk: "",
      mts: "https://music.mts.ru/album/33837161/track/132484707",
    },
  },
  {
    title: "Гудбай, Америка",
    colorLogo: "/logo-color/blue.png",
    links: {
      yandex: "https://music.yandex.ru/album/33837160/track/132484706",
      vk: "",
      zvuk: "",
      mts: "https://music.mts.ru/album/33837160/track/132484706",
    },
  },
  {
    title: "Выше",
    colorLogo: "/logo-color/mint.png",
    links: {
      yandex: "https://music.yandex.ru/album/38788512/track/144294646",
      vk: "",
      zvuk: "",
      mts: "https://music.mts.ru/album/38788512/track/144294646",
    },
  },
  {
    title: "Туда",
    colorLogo: "/logo-color/purple.png",
    links: {
      yandex: "https://music.yandex.ru/album/38788513/track/144294650",
      vk: "",
      zvuk: "",
      mts: "https://music.mts.ru/album/38788513/track/144294650",
    },
  },
  {
    title: "Всё, что в жизни есть у меня",
    colorLogo: "/logo-color/green.png",
    links: {
      yandex: "https://music.yandex.ru/album/38804764/track/144327013",
      vk: "",
      zvuk: "",
      mts: "https://music.mts.ru/album/38804764/track/144327013",
    },
  },
  {
    title: "Грею счастье",
    colorLogo: "/logo-color/orange.png",
    links: {
      yandex: "https://music.yandex.ru/album/38883201/track/144488594",
      vk: "",
      zvuk: "",
      mts: "https://music.mts.ru/album/38883201/track/144488594",
    },
  },
  {
    title: "Единственная",
    colorLogo: "/logo-color/pink.png",
    links: {
      yandex: "https://music.yandex.ru/album/42551366/track/152443999",
      vk: "",
      zvuk: "",
      mts: "https://music.mts.ru/album/42551366/track/152443999",
    },
  },
  {
    title: "Кровь горячая",
    colorLogo: "/logo-color/red.png",
    links: {
      yandex: "https://music.yandex.ru/album/43101043/track/153737062",
      vk: "",
      zvuk: "",
      mts: "https://music.mts.ru/album/43101043/track/153737062",
    },
  },
];