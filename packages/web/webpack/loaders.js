const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { ROOT_DIR } = require("./envs");

const babelLoader = {
  loader: "babel-loader",
  options: {
    configFile: path.join(ROOT_DIR, "/babel.config.js"),
  },
};

// const cssLoader = "css-loader";
const cssLoader = {
  loader: "css-loader",
  options: {
    importLoaders: 1,
    // modules: {
    //   localIdentName: '[sha1:hash:hex:4]"',
    // },
  },
};
const styleLoader = "style-loader";

const miniCssExtractLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    // This is required for asset imports in CSS, such as url()
    publicPath: "",
  },
};

const postCssLoader = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: { plugins: [require("autoprefixer")()] },
  },
});

module.exports = {
  babelLoader,
  cssLoader,
  miniCssExtractLoader,
  postCssLoader,
  styleLoader,
};
