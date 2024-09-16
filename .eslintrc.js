module.exports = {
  env: {
    browser: true,
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
        sourceType: "module" // Utiliser "module" pour les ESM
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module" // Changer "script" en "module" pour les modules ECMAScript
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
