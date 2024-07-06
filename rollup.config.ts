import { defineConfig } from "rollup";
import copy from "rollup-plugin-copy-assets";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "src/main.ts",
  output: [
    {
      dir: "dist",
      name: "main.js",
      format: "cjs",
    },
  ],
  cache: true,
  plugins: [
    copy({
      assets: ["src/icon.png", "src/info.json"],
    }),
    typescript(),
  ],
});
