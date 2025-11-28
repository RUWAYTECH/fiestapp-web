import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier/recommended';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import globals from 'globals';

export default defineConfig([
	globalIgnores(['.next/**', 'public/**', 'out/**', 'build/**', 'next.config.js', 'postcss.config.js']),
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		}
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	react.configs.flat.recommended,
	...nextVitals,
	...nextTs,
	prettier,
	{
		rules: {
			'@next/next/no-img-element': 'off',
			'react-hooks/exhaustive-deps': 'off',
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
					bracketSpacing: true,
					printWidth: 120,
					singleQuote: true,
					semi: true,
					useTabs: true,
					tabWidth: 2,
					trailingComma: 'none',
					arrowParens: 'avoid'
				},
				{
					usePrettierrc: false
				}
			],
			'react/react-in-jsx-scope': 'off',
			'eol-last': ['error', 'always'],
			semi: ['error', 'always'],
			'react/prop-types': 'off',
			quotes: ['error', 'single'],
			'no-trailing-spaces': 'error',
			'no-tabs': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],
			'@typescript-eslint/no-explicit-any': ['warn']
		}
	},
	{
		files: ['**/*.{jsx,tsx}'],
		rules: {
			'no-console': 'warn'
		}
	}
]);
