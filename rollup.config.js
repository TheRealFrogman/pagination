import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
   input: "index.ts",
   output: [
      {
         file: "out/index.js",
         format: "es",
         name: "ArrayPager",
         sourcemap: true,
      },
      
      {
         file: "out/index.min.js",
         format: "es",
         name: "ArrayPager",
         plugins: [terser()],
         sourcemap: true,
      },
   ],
   plugins: [typescript({ tsconfig: "./tsconfig.json" }), nodeResolve()],
};
