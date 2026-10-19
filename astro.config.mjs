// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Порт можно переопределить через PORT: превью из Claude поднимается на свободном
  // порту и не отбирает 4321 у локального `npm run dev`.
  server: {
    port: Number(process.env.PORT ?? 4321),
  },
  vite: {
    plugins: [tailwindcss()]
  }
});