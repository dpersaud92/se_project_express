module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "airbnb-base",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "script",
  },
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
