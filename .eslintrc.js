module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
