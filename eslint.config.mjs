
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
                ...globals.browser
            }
        }
    },
    {
        plugins: {},
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.node
            }
        },
        files: [
            '**/webpack.*',
            "./compiler/webpack/**"
        ]
    },
    {
        plugins: {},
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.jest
            }
        },
        files: [
            '**/spec/jest/**/*.spec.ts'
        ]
    },
    eslint.configs.recommended,
    ...tslint.configs.recommended,
    {
        rules: {
            "@typescript-eslint/triple-slash-reference": 'off',
            "@typescript-eslint/no-unused-vars": 'off',
            "@typescript-eslint/no-require-imports": 'off',
            'tsdoc/syntax': 'warn',
            "prefer-const": 'off'
        }
    }
];
