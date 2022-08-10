import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";
import pkg from "./package.json";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";
import image from '@rollup/plugin-image'

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default {
  input: "src/index.ts",
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" },
  ],
  plugins: [
    image(),
    url(),
    typescript(),
    commonjs(),
    copy({
      targets: [{ src: "README.MD", dest: "dist" }],
    }),
  ],
  external,
};
