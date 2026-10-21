import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ferrcodes.github.io',
  base: '/Portofolio',
  integrations: [tailwind()],
});