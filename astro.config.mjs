import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/postcss";

export default defineConfig({
  integrations: [preact({ compat: true })],
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
