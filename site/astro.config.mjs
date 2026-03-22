import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";
import remarkDirective from "remark-directive";

// https://astro.build/config
export default defineConfig({
  site: "https://gamification.example.com",

  integrations: [vue(), sitemap()],

  markdown: {
    remarkPlugins: [remarkDirective],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },

  // Static output — no server adapter needed
  output: "static",
});
