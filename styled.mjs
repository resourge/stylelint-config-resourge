import getConfig, { IGNORE_FILES as DEFAULT_IGNORE_FILES } from './src/config.mjs';

export const IGNORE_FILES = [
	...DEFAULT_IGNORE_FILES,
	'!**/*.styles.ts'
]

export default getConfig({
	overrides: [
		{
			files: ['*.styles.*'],
			customSyntax: 'postcss-styled-syntax',
		}
	]
})
