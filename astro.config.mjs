import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import clerk from "@clerk/astro";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [react(), clerk()],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      CONVEX_URL: envField.string({ context: "client", access: "public" }),
    },
  },
});
