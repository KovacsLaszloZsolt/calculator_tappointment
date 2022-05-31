import { CalcState } from '../interfaces';
import fulfillOperation from './fulfillOperation';
import numToSciNotation from './numToSciNotation';

export const onError = {
  prevValue: '',
  currentValue: 'Error',
  firstNum: null,
  secondNum: null,
  firstOperation: '',
  secondOperation: '',
  isEqualClicked: false,
};

const handleOperation = (operation: string, calcState: CalcState): Partial<CalcState> => {
  if (calcState.firstNum === null) {
    const firstNum = parseFloat(calcState.currentValue);

    return {
      prevValue: `${numToSciNotation(firstNum)} ${operation}`,
      firstNum: firstNum,
      firstOperation: operation,
      currentValue: '0',
    };
  }

  if (calcState.secondNum === null) {
    if (
      calcState.firstOperation === '*' ||
      calcState.firstOperation === '/' ||
      operation === '-' ||
      operation === '+'
    ) {
      const partialResult = fulfillOperation(
        calcState.firstNum,
        parseFloat(calcState.currentValue),
        calcState.firstOperation,
      );

      if (partialResult === 'Error') {
        return onError;
      }

      return {
        prevValue: `${numToSciNotation(partialResult)} ${operation}`,
        currentValue: '0',
        firstNum: partialResult,
        firstOperation: operation,
      };
    }

    const secondNum = parseFloat(calcState.currentValue);
    return {
      prevValue: `${calcState.prevValue} ${secondNum} ${operation}`,
      currentValue: '0',
      secondNum,
      secondOperation: operation,
    };
  }

  if (operation === '+' || operation === '-') {
    const firstPartialResult = fulfillOperation(
      calcState.secondNum,
      parseFloat(calcState.currentValue),
      calcState.secondOperation,
    );
    if (firstPartialResult === 'Error') {
      return onError;
    }

    const partialResult = fulfillOperation(calcState.firstNum, firstPartialResult, calcState.firstOperation);
    if (partialResult === 'Error') {
      return onError;
    }

    return {
      prevValue: `${numToSciNotation(partialResult)} ${operation}`,
      currentValue: '0',
      firstNum: partialResult,
      firstOperation: operation,
      secondNum: null,
      secondOperation: '',
    };
  }

  const partialResult = fulfillOperation(
    calcState.secondNum,
    parseFloat(calcState.currentValue),
    calcState.secondOperation,
  );

  if (partialResult === 'Error') {
    return onError;
  }

  return {
    prevValue: `${numToSciNotation(calcState.firstNum)} ${calcState.firstOperation} ${numToSciNotation(
      partialResult,
    )} ${operation}`,
    currentValue: '0',
    secondNum: partialResult,
    secondOperation: operation,
  };
};

export default handleOperation;
