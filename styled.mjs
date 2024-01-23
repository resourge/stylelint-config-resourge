import getConfig from './src/config.mjs';

export default getConfig({
	ignoreFiles: ['**/!(*.styles).ts'],
	overrides: [
		{
			files: ['*.styles.*'],
			customSyntax: 'postcss-styled-syntax'
		}
	]
})
