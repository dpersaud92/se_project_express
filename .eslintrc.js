module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended", // 👈 ADD THIS LINE
    "airbnb-base",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script",
  },
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
