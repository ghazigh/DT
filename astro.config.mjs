import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ghazigh.github.io/DT',
  base: '/DT',
  output: 'static',
  integrations: [
    mdx(),
    react(),
    tailwind({ applyBaseStyles: false })
  ],
  vite: {
    ssr: {
      noExternal: ['maplibre-gl']
    }
  }
});
