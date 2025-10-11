import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  build: {
    emptyOutDir: false,
  },
  base: "",
  server: {
    host: "0.0.0.0",
    port: 1040,
    watch: {
      ignored: ["res/**/*", "main/**/*"],
    },
  },
});
