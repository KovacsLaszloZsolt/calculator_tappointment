import { maxNumberOfDigits } from '../App';
import checkLastNumber from './checkLastNumber';

const numToSciNotation = (num: number): string => {
  if (num > 10 ** maxNumberOfDigits) {
    return num.toPrecision(5);
  }

  const numStr = num.toString();
  if (numStr.includes('.') && numStr.length >= maxNumberOfDigits) {
    return checkLastNumber(num.toPrecision(maxNumberOfDigits));
  }

  return `${num}`;
};
export default numToSciNotation;
