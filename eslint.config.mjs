import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
	{ ignores: ['.next/**', 'public/**', 'next.config.js', 'postcss.config.js'] },
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	...compat.config({
		extends: ['next', 'next/core-web-vitals', 'next/typescript'],
		settings: {
			next: {
				rootDir: '.',
			},
		},
	}),
	{
		rules: {
			'react/react-in-jsx-scope': 'off',
			'eol-last': [
				'error',
				'never'
			],
			'semi': ['error', 'never'],
			'react/prop-types': 'off',
			'@/quotes': [
				'error',
				'single'
			],
			'no-trailing-spaces': 'error',
			'no-tabs': 'off',
			'@/indent': [
				'error',
				'tab',
				{
					'SwitchCase': 1
				}
			],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-floating-promises': 'off'
		},
	},
	{
		files: ['**/*.{jsx,tsx}'],
		rules: {
			'no-console': 'warn',
		},
	},
]

export default eslintConfig