import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from "@rollup/plugin-terser";
import { defineConfig } from "rollup";
import { readFileSync } from "node:fs";

const version = JSON.parse(
  readFileSync("./package.json", { encoding: "utf-8" })
).version;

console.log("building version:", version);

const banner = `/**
 * markedAlm v${version} - a marked extension for Anilist-Flavored Markdown
 * Copyright (c) 2023-${new Date().getFullYear()}, Nguyen Dang Vinh. (MIT Licensed)
 * https://github.com/meocoder31099/marked-alm
 */

/**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */
`;

export default defineConfig([
  {
    input: "src/marked-alm.ts",
    output: [
      {
        file: "lib/marked-alm.esm.js",
        format: "esm",
        name: "marked-alm",
        sourcemap: true,
        banner,
      },
      {
        file: "lib/marked-alm.umd.js",
        format: "umd",
        name: "marked-alm",
        sourcemap: true,
        banner,
      },
      {
        file: "marked-alm.min.js",
        format: "umd",
        name: "marked-alm",
        sourcemap: false,
        banner,
        plugins: [terser()],
      },
      {
        file: "lib/marked-alm.cjs",
        format: "cjs",
        name: "marked-alm",
        sourcemap: true,
        banner,
      },
    ],
    plugins: [typescript(), nodeResolve()],
  },
]);
