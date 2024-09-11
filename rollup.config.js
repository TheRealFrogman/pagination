import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
   input: "index.ts",
   output: [
      {
         file: "out/array-pager.js",
         format: "umd",
         name: "ArrayPager",
         sourcemap: true,
      },
      {
         file: "out/array-pager.min.js",
         format: "umd",
         name: "ArrayPager",
         plugins: [terser()],
         sourcemap: true,
      },
   ],
   plugins: [typescript(), nodeResolve()],
};
