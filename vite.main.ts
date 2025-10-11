import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isPrd = mode === "production";

  return {
    publicDir: false,
    build: {
      emptyOutDir: false,
      minify: isPrd,
      sourcemap: !isPrd,
      rollupOptions: {
        input: "main/index.ts",
        output: {
          format: "cjs",
          dir: "dist",
          entryFileNames: "main.js",
        },
        external: ["electron", "path", "fs/promises"],
      },
    },
  };
});
