import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://ferrcodes.github.io',
  base: '/Portofolio',
  integrations: [tailwind()],
  integrations: [tailwind(), react()],
});