import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";
import pkg from "./package.json";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";

export default {
  input: "src/index.ts",
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" },
  ],
  plugins: [
    url(),
    typescript(),
    commonjs(),
    copy({
      targets: [{ src: "README.MD", dest: "dist" }],
    }),
  ],
  external: {
    react: "react",
    "styled-components": "styled-components",
  },
};
