import { useState } from 'react';
import './App.scss';
import Display from './components/Display/Display';
import Keyboard from './components/Keyboard/Keyboard';
import Modal from './components/Modal/Modal';
import { CalcState, ModalMessage } from './interfaces';

export const maxNumberOfDigits = 12;

function App(): JSX.Element {
  const [calcState, setCalcState] = useState<CalcState>({
    currentValue: '0',
    prevValue: '',
    firstNum: null,
    secondNum: null,
    firstOperation: '',
    secondOperation: '',
    isEqualClicked: false,
  });

  const [modalMessage, setModalMessage] = useState<ModalMessage>({ type: '', message: '' });

  return (
    <div className="App">
      <Display calcState={calcState} />
      <Keyboard calcState={calcState} setCalcState={setCalcState} setModalMessage={setModalMessage} />
      {modalMessage.message && <Modal modalMessage={modalMessage} setModalMessage={setModalMessage} />}
    </div>
  );
}

export default App;
