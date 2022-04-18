module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    // "plugin:react/recommended",
    // "standard",
    "plugin:@typescript-eslint/eslint-recommended",
    // "prettier/@typescript-eslint",
    // "prettier/standard",
    // "prettier/react",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    // ecmaVersion: 11,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    // "prettier/prettier": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
    react: {
      version: "detect",
    },
  },
};
