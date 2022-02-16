import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'

const packageJson = require("./package.json");

const config = {
    input: "src/index.ts",
    output: [
        {
            file: packageJson.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: packageJson.module,
            format: "es",
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        url(),
        json(),
        alias({
            entries: [
                { find: 'readable-stream', replacement: 'stream' }
            ]
        }),
        resolve({ preferBuiltins: false }),
        typescript({ tsconfig: './tsconfig.json' }),
        commonjs(),
    ]
};

export default config