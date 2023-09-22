import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './forbidden-enum';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [],
  invalid: [
    {
      code: 'enum Color { Red, Green, Blue }',
      errors: [
        {
          messageId: 'noTypescriptEnum',
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code: 'const enum Cars { Ford, BMW, Honda }',
      errors: [
        {
          messageId: 'noTypescriptEnum',
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code: 'const enum Weekdays { MONDAY = "Monday", TUESDAY = "Tuesday", Sunday = "Sunday" }',
      errors: [
        {
          messageId: 'noTypescriptEnum',
          column: 1,
          line: 1,
        },
      ],
    },
  ],
});
