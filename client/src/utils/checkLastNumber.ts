const checkLastNumber = (numStr: string): string => {
  if (numStr.endsWith('0')) {
    return checkLastNumber(numStr.slice(0, numStr.length - 1));
  }

  return numStr;
};

export default checkLastNumber;
