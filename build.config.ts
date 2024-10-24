import { fileURLToPath } from "node:url";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index.ts",
    {
      builder: "mkdist",
      input: "src/services",
      outDir: "dist",
    },
  ],
  clean: false,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  externals: [fileURLToPath(new URL("src/services", import.meta.url))],
});
