import { defineConfig } from "rollup";
import terser from "@rollup/plugin-terser";
import zip from "rollup-plugin-zip";
import clear from "rollup-plugin-clear";
import copy from "rollup-plugin-copy-assets";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "src/main.ts",
  output: [
    {
      dir: "dist",
      name: "index.js",
      format: "cjs",
    },
    {
      dir: "dist",
      name: "index.min.js",
      format: "cjs",
      plugins: [terser()],
    },
  ],
  cache: true,
  plugins: [
    clear({
      targets: ["dist"],
    }),
    copy({
      assets: ["src/icon.png", "src/info.json"],
    }),
    typescript(),
    zip({
      file: "bob-plugin-ollama-explainer.zip",
    }),
  ],
});
