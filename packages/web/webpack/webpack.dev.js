const { ROOT_DIR } = require("./envs");
const path = require("path");
const {
  caseSensitivePathsPlugin,
  webpackNotifierPlugin,
  webpackPluginServe,
  reactRefreshPlugin,
} = require("./plugins");

const devConfig = {
  // entry: ["webpack-plugin-serve/client"],

  devtool: "source-map",

  // watch: true,

  stats: {
    errorDetails: true,
    children: true,
  },

  devServer: {
    port: 8080,
    static: path.join(ROOT_DIR, "/dist"),
    host: "localhost",
    hot: true,
    historyApiFallback: true,
  },

  plugins: [
    reactRefreshPlugin,
    // webpackPluginServe,
    caseSensitivePathsPlugin,
    // webpackNotifierPlugin,
  ],
};

module.exports = devConfig;
