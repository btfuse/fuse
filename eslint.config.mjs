
import globals from 'globals';
import tsdoc from 'eslint-plugin-tsdoc';
import eslint from "@eslint/js";
import tslint from 'typescript-eslint';

export default [
    {
        plugins: {
            tsdoc
        },
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.jest
            }
        }
    },
    eslint.configs.recommended,
    ...tslint.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": 'off',
            'tsdoc/syntax': 'warn',
            "prefer-const": 'off'
        }
    }
];

// module.exports = {
//     extends: [
//         'eslint:recommended',
//         'plugin:@typescript-eslint/recommended'
//     ],
//     parser: '@typescript-eslint/parser',
//     plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
//     ignorePatterns: [
//         "**/lib/**"
//     ],
//     root: true,
//     rules: {
//         "@typescript-eslint/no-unused-vars": 'off',
//         'tsdoc/syntax': 'warn'
//     }
// };
