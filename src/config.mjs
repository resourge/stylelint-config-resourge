export const IGNORE_FILES = [
	'**/node_modules/**',
	'**/dist/**',
	'**/*.ts',
	'**/*.tsx',
]

export default function getConfig({
	recommended = [],
	plugins = [],
	overrides = [],
	rules = {}
}) {
	return {
		extends: [
			'stylelint-config-standard',
			'stylelint-config-clean-order/error',
			...recommended
		],
		plugins: [
			'stylelint-use-logical-spec',
			'stylelint-declaration-block-no-ignored-properties',
			'./src/lib/index.mjs',
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
