import { Config } from 'stylelint';

export default function getConfig({
	recommended = [],
	plugins = [],
	overrides = [],
	rules = {},
	ignoreFiles = {}
}): Config {
	return {
		extends: [
			'stylelint-config-standard',
			'stylelint-config-clean-order/error',
			...recommended
		],
		ignoreFiles: [
			'**/node_modules/**',
			'**/dist/**',
			...ignoreFiles
		],
		plugins: [
			'stylelint-use-logical-spec',
			'stylelint-declaration-block-no-ignored-properties',
			'./lib/rules/indentation.mjs',
			'./lib/rules/declaration-block-semicolon-newline-after.mjs',
			...plugins
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
			'font-family-no-missing-generic-family-keyword': null,
			...rules
		},
		overrides: overrides
	};
};
