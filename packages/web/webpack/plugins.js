const { ROOT_DIR } = require("./envs");

const path = require("path");
const glob = require("glob");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin"); // use inside the npm package
const WebpackNotifierPlugin = require("webpack-notifier");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin, BannerPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const WebpackObfuscator = require("webpack-obfuscator");

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const PATH = path.join(ROOT_DIR, "/src");

const caseSensitivePathsPlugin = new CaseSensitivePathsPlugin();

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(ROOT_DIR, "./public/index.html"),
  filename: "index.html",
  inject: true,
});

const webpackNotifierPlugin = new WebpackNotifierPlugin({
  title: function (params) {
    return `Build status is ${params.status} with message ${params.message}`;
  },
});

const miniCssExtactPlugin = new MiniCssExtractPlugin({
  // filename: "[name].css",
  filename: "[name].[contenthash].css",
});

const purgeCssPlugin = new PurgeCSSPlugin({
  paths: glob.sync(`${PATH}/**/*`, { nodir: true }), // Consider extracting as a parameter
  extractors: [
    {
      extractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
      extensions: ["html"],
    },
  ],
});

// const mode = process.env.NODE_ENV ?? "production";
const definePlugin = new DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
});

const cleanWebpacklugin = new CleanWebpackPlugin();

const esLintPlugin = new ESLintWebpackPlugin({
  context: path.join(ROOT_DIR, "/src"),
  extensions: ["js", "jsx", "ts", "tsx"],
});

const reactRefreshPlugin = new ReactRefreshWebpackPlugin();

const forkTsPlugin = new ForkTsCheckerWebpackPlugin({
  async: false,
  // eslint: {
  //   files: path.join(ROOT_DIR, "/src/**/*"),
  // },
});

const obfuscatorPlugin = new WebpackObfuscator(
  {
    rotateStringArray: true,
  },
  ["excluded_bundle_name.js"]
);

const minifyJTS = new TerserPlugin();
const minifyCss = ({ options }) =>
  new CssMinimizerPlugin({ minimizerOptions: options });

module.exports = {
  htmlWebpackPlugin,
  caseSensitivePathsPlugin,
  webpackNotifierPlugin,
  purgeCssPlugin,
  miniCssExtactPlugin,
  definePlugin,
  cleanWebpacklugin,
  esLintPlugin,
  reactRefreshPlugin,
  obfuscatorPlugin,
  forkTsPlugin,
  minifyCss,
  minifyJTS,
};
