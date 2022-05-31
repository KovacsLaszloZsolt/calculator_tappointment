import { ModalMessage, MODALTYPE } from '../../interfaces';
const saveResult = async (result: string): Promise<ModalMessage> => {
  try {
    const res = await fetch('http://localhost:3000/save', {
      method: 'POST',
      headers: {
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
