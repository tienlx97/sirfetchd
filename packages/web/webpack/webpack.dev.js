const { ROOT_DIR } = require("./envs");
const path = require("path");
const { caseSensitivePathsPlugin, reactRefreshPlugin } = require("./plugins");

const devConfig = {
  // entry: ["webpack-plugin-serve/client"],

  devtool: "source-map",

  // watch: true,

  stats: {
    errorDetails: true,
    children: true,
  },

  devServer: {
    client: {
      overlay: false,
    },
    port: 8080,
    static: path.join(ROOT_DIR, "/dist"),
    host: "localhost",
    hot: true,
    historyApiFallback: true,
  },

  plugins: [reactRefreshPlugin, caseSensitivePathsPlugin],
};

module.exports = devConfig;
