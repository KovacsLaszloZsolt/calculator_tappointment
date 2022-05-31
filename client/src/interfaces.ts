export type CalcState = {
  currentValue: string;
  prevValue: string;
  firstNum: null | number;
  secondNum: null | number;
  firstOperation: string;
  secondOperation: string;
  isEqualClicked: boolean;
};

export type ModalMessage = {
  type: string;
  message: string;
};

export enum MODALTYPE {
  ERROR = 'error',
  SUCCEEDED = 'succeeded',
  GENERAL = 'general',
}
