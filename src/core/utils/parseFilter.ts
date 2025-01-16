type SimpleExpression = {
  left: string;
  operator: string;
  right: string;
};

const OperationPrismaDictionary = {
  eq: 'equals',
  ne: 'not',
  gt: 'gt',
  ge: 'gte',
  lt: 'lt',
  le: 'lte',
};

class SimpleExpressionParser {
  static parse(input: string): SimpleExpression | null {
    input = input.trim();

    for (const operator of Object.keys(OperationPrismaDictionary)) {
      const parts = this.splitExpression(input, operator);
      if (parts) {
        const [left, right] = parts;
        return {
          left: left.trim(),
          operator: operator,
          right: right.trim(),
        };
      }
    }
    return null;
  }

  private static splitExpression(input: string, operator: string): string[] | null {
    const regex = new RegExp(`(.*?)\\s${operator}\\s(.*)`);
    const match = input.match(regex);
    return match ? [match[1], match[2]] : null;
  }
}

export { OperationPrismaDictionary, SimpleExpression, SimpleExpressionParser };
