
/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
    ignorePatterns: [
        "**/lib/**"
    ],
    root: true,
    rules: {
        "@typescript-eslint/no-unused-vars": 'off',
        'tsdoc/syntax': 'warn'
    }
};
