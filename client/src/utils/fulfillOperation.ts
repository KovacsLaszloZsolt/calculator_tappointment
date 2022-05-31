const fulfillOperation = (num1: number, num2: number, operation: string): number | 'Error' => {
  const checkResult = (result: number | typeof NaN): number | 'Error' => {
    if (isNaN(result) || result === Infinity) {
      return 'Error';
    }

    return result;
  };
  switch (operation) {
    case '+':
      return checkResult(num1 + num2);
    case '-':
      return checkResult(num1 - num2);
    case '/':
      return checkResult(num1 / num2);
    default:
      return checkResult(num1 * num2);
  }
};

export default fulfillOperation;
