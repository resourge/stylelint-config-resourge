import getConfig from './src/config'

export default getConfig({
	ignoreFiles: ['**/!(*.styles).ts'],
	overrides: [
		{
			files: ['*.styles.*'],
			customSyntax: 'postcss-styled-syntax'
		}
	]
})
