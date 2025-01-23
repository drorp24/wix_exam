import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

const OFF = 0;
const WARN = 1;
const ERROR = 2;

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            react: react,
            prettier: prettier,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            import: importPlugin,
            'unused-imports': unusedImports,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'no-var': ERROR,
            'no-debugger': ERROR,
            'no-console': [WARN, { allow: ['warn', 'error'] }],
            'prefer-const': WARN,
            'import/no-unresolved': ERROR,
            'prettier/prettier': WARN,
            'unused-imports/no-unused-imports': WARN, // Warn about unused imports
            '@typescript-eslint/no-unused-vars': [WARN, { args: 'after-used', argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': OFF,
            '@typescript-eslint/no-empty-function': WARN,
            'react/state-in-constructor': OFF,
            'react/static-property-placement': WARN,
            'react/jsx-props-no-spreading': OFF,
            'react/button-has-type': WARN,
            'react/prop-types': OFF,
            'react-hooks/exhaustive-deps': ERROR,
            'react/display-name': WARN,
            'react/react-in-jsx-scope': OFF,
            'react/jsx-key': WARN,
            '@typescript-eslint/no-explicit-any': OFF,
            'sort-imports': [
                ERROR,
                {
                    ignoreCase: false,
                    ignoreDeclarationSort: true, // dont want to sort import lines, use eslint-plugin-import instead
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                    allowSeparatedGroups: true,
                },
            ],
            'import/order': [
                ERROR,
                {
                    groups: [
                        'builtin', // Built-in imports (come from NodeJS native) go first
                        'external', // <- External imports
                        'internal', // <- Absolute imports
                        ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
                        'index', // <- index imports
                        'unknown', // <- unknown
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
                        order: 'asc',
                        /* ignore case. Options: [true, false] */
                        caseInsensitive: true,
                    },
                },
            ],
        },
        settings: {
            react: {
                pragma: 'React',
                version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
            },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import/resolver': {
                node: {
                    paths: ['src', 'tests'],
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
        },
    }
);
