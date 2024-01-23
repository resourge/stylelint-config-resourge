import blockString from 'stylelint/lib/utils/blockString.mjs';
import rawNodeString from 'stylelint/lib/utils/rawNodeString.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import stylelint from 'stylelint';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';
import whitespaceChecker from '../util/whitespaceChecker.mjs';
import { isAtRule, isRule } from 'stylelint/lib/utils/typeGuards.mjs';

function nextNonCommentNode(startNode) {
	if (!startNode || !startNode.next) return null;

	if (startNode.type === 'comment') {
		return nextNonCommentNode(startNode.next());
	}

	return startNode;
};

const ruleName = 'resourge/declaration-block-semicolon-newline-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected newline after ";"',
	expectedAfterMultiLine: () => 'Expected newline after ";" in a multi-line declaration block',
	rejectedAfterMultiLine: () => 'Unexpected newline after ";" in a multi-line declaration block',
});

const meta = {
	url: 'https://stylelint.io/user-guide/rules/declaration-block-semicolon-newline-after',
	fixable: true,
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('newline', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'always-multi-line', 'never-multi-line'],
		});

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			// Ignore last declaration if there's no trailing semicolon
			const parentRule = decl.parent;

			if (!parentRule) throw new Error('A parent node must be present');

			if (!isAtRule(parentRule) && !isRule(parentRule)) {
				return;
			}

			if (!parentRule.raws.semicolon && parentRule.last === decl) {
				return;
			}

			const nextNode = decl.next();

			if (!nextNode) {
				return;
			}

			// Allow end-of-line comment
			const nodeToCheck = nextNonCommentNode(nextNode);

			if (!nodeToCheck) {
				return;
			}

			checker.afterOneOnly({
				source: rawNodeString(nodeToCheck),
				index: -1,
				lineCheckStr: blockString(parentRule),
				err: (m) => {
					if (context.fix) {
						if (primary.startsWith('always')) {
							const index = nodeToCheck.raws.before.search(/\r?\n/);

							nodeToCheck.raws.before =
								index >= 0
									? nodeToCheck.raws.before.slice(index)
									: context.newline + nodeToCheck.raws.before;

							return;
						}

						if (primary === 'never-multi-line') {
							nodeToCheck.raws.before = '';

							return;
						}
					}

					report({
						message: m,
						node: decl,
						index: decl.toString().length + 1,
						result,
						ruleName,
					});
				},
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default stylelint.createPlugin(ruleName, rule);