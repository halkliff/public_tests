module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
    "plugin:react/recommended",
    "plugin:jest/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2019,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "react",
    "react-hooks",
    "jest",
    "prettier"
  ],
  rules: {
    "prettier/prettier": ["error", { singleQuote: true, parser: "typescript" }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    quotes: [1, "single", { allowTemplateLiterals: true }],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "import/no-unresolved": 0
  }
};
