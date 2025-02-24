module.exports = [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      globals: {
        node: true,
        es6: true,
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      // Add any custom rules here
      ...require('eslint-plugin-import').rules['eslint:recommended'],
      ...require('@typescript-eslint/eslint-plugin').rules['plugin:@typescript-eslint/recommended'],
    },
  },
];