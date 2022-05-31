import { CalcState } from '../interfaces';
import fulfillOperation from './fulfillOperation';
import { onError } from './handleOperation';
import numToSciNotation from './numToSciNotation';

const getResult = (calcState: CalcState): CalcState => {
  const currentNum = parseFloat(calcState.currentValue);

  if (calcState.secondOperation) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const partialResult = fulfillOperation(calcState.secondNum!, currentNum, calcState.secondOperation);

    if (partialResult === 'Error') {
      return onError;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const result = fulfillOperation(calcState.firstNum!, partialResult, calcState.firstOperation);

    return {
      currentValue: `${result === 'Error' ? result : numToSciNotation(result)}`,
      prevValue: '',
      firstNum: null,
      secondNum: null,
      firstOperation: '',
      secondOperation: '',
      isEqualClicked: true,
    };
  }

  if (calcState.firstOperation) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const result = fulfillOperation(calcState.firstNum!, currentNum, calcState.firstOperation);

    return {
      currentValue: `${result === 'Error' ? result : numToSciNotation(result)}`,
      prevValue: '',
      firstNum: null,
      secondNum: null,
      firstOperation: '',
      secondOperation: '',
      isEqualClicked: true,
    };
  }

  return calcState;
};

export default getResult;
