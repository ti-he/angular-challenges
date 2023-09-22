/**
 * This file sets you up with structure needed for an ESLint rule.
 *
 * It leverages utilities from @typescript-eslint to allow TypeScript to
 * provide autocompletions etc for the configuration.
 *
 * Your rule's custom logic will live within the create() method below
 * and you can learn more about writing ESLint rules on the official guide:
 *
 * https://eslint.org/docs/developer-guide/working-with-rules
 *
 * You can also view many examples of existing rules here:
 *
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace/forbidden-enum"
export const RULE_NAME = 'forbidden-enum';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: `Disallow TypeScript enums`,
      recommended: 'error',
    },
    schema: [],
    messages: {
      noTypescriptEnum:
        'Avoid using TypeScript enums. Use type unions instead.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      // When an enum is found in the AST
      TSEnumDeclaration(node: TSESTree.TSEnumDeclaration): void {
        context.report({
          node: node,
          messageId: 'noTypescriptEnum',
        });
      },
    };
  },
});
