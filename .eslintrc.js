module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
