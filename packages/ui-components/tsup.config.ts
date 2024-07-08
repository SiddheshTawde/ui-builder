import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  minify: true,
  minifyWhitespace: true,
  external: ["react"],
  ...options,
}));
