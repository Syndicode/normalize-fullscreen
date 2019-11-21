import babel from "rollup-plugin-babel";

module.exports = {
  input: ["./src/normalize-fullscreen.js", "./src/use-fullscreen.js"],
  output: {
    dir: "./dist/",
    format: "cjs",
    exports: "default",
    sourcemap: "inline"
  },
  plugins: [babel()]
};
