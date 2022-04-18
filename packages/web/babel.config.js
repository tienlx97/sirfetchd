module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: [">1%", "last 4 versions", "not ie < 9"],
        },
        useBuiltIns: "usage",
        debug: false,
        corejs: 3,
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  assumptions: {
    setSpreadProperties: true,
  },
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-proposal-object-rest-spread",
    // Applies the react-refresh Babel plugin on non-production modes only
    process.env.NODE_ENV !== "production" && "react-refresh/babel",
    [
      "@ladifire-opensource/babel-plugin-transform-stylex",
      {
        inject: true, // will inject compiled css to stylesheet in head
      },
    ],
  ].filter(Boolean),
};
