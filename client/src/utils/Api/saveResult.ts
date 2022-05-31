import { ModalMessage, MODALTYPE } from '../../interfaces';
import baseUrl from './baseUrl';
const saveResult = async (result: string): Promise<ModalMessage> => {
  try {
    const res = await fetch(`${baseUrl}/save`, {
      method: 'POST',
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result }),
    });

    if (res.ok) {
      return { type: MODALTYPE.SUCCEEDED, message: `Result successfully saved` };
    } else {
      return { type: MODALTYPE.ERROR, message: 'Error during result saving.' };
    }
  } catch (err) {
    console.log(err);
    return { type: MODALTYPE.ERROR, message: 'Something went wrong.' };
  }
};

export default saveResult;
