import { CalcState, ModalMessage, MODALTYPE } from '../../interfaces';

type ErrorObj = {
  error: string;
};
const loadSavedResult = async (): Promise<number | ModalMessage> => {
  try {
    const res = await fetch('http://localhost:3000/load');
    const savedResult = (await res.json()) as number | ErrorObj;

    if (res.ok) {
      return savedResult as number;
    }

    const error = savedResult as ErrorObj;
    return { type: MODALTYPE.ERROR, message: error.error };
  } catch (err) {
    console.log(err);
    return { type: MODALTYPE.ERROR, message: 'Error during file reading' };
  }
};

export default loadSavedResult;
