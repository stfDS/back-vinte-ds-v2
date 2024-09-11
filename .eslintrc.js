module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    quotes: ["warn", "double"],
    "no-var": "error",
    eqeqeq: ["error", "always"],
    "no-console": "warn",
    "no-multiple-empty-lines": [
      "warn",
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 0
      }
    ]
  }
}
