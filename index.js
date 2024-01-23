/** @type {import('stylelint').Config} */
export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-clean-order/error'
	],
	ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/!(*.styles).ts'],
	plugins: [
		'stylelint-use-logical-spec',
		'stylelint-declaration-block-no-ignored-properties',
		'./lib/rules/indentation.mjs',
		'./lib/rules/declaration-block-semicolon-newline-after.mjs'
	],
	rules: {
		'resourge/declaration-block-semicolon-newline-after': ['always'],
		'resourge/indentation': ['tab', {
			indentInsideParens: 'twice'
		}],

		'liberty/use-logical-spec': true,
		'plugin/declaration-block-no-ignored-properties': true,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['tailwind']
			}
		],
		'font-family-no-missing-generic-family-keyword': null
	},
	overrides: [
		{
			files: ['*.styles.*'],
			customSyntax: 'postcss-styled-syntax'
		}
	]
};
