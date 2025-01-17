type SimpleExpression = {
  left: string;
  operator: string;
  right: string;
};

type CombinedExpression = {
  combined: 'and' | 'or' | null;
  children: SimpleExpression[];
};

const OperationPrismaDictionary = {
  eq: 'equals',
  ne: 'not',
  gt: 'gt',
  ge: 'gte',
  lt: 'lt',
  le: 'lte',
  and: 'and',
  or: 'or',
};

class SimpleExpressionParser {
  static parse(input: string): CombinedExpression {
    const regex = /(?:(\w+)\s(eq|ne|gt|ge|lt|le)\s([\w@.']+))(?:\s(and|or)\s)?/g;

    const matches = [...input.matchAll(regex)];
    const result: CombinedExpression = {
      combined: null,
      children: [],
    };

    matches.forEach((match, index) => {
      const [_, left, operator, right, combined] = match;

      result.children.push({
        left: left.trim(),
        operator: operator.trim(),
        right: right.trim(),
      });

      if (index === 0 && combined) {
        result.combined = combined.trim() as 'and' | 'or';
      }
    });

    //@ts-ignore
    return result;
  }
}

export { CombinedExpression, OperationPrismaDictionary, SimpleExpression, SimpleExpressionParser };
