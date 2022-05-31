import React from 'react';
import { maxNumberOfDigits } from '../../App';
import { CalcState, ModalMessage, MODALTYPE } from '../../interfaces';
import loadSavedResult from '../../utils/Api/loadSavedResult';
import saveResult from '../../utils/Api/saveResult';
import getResult from '../../utils/getResult';
import handleOperation from '../../utils/handleOperation';
import numToSciNotation from '../../utils/numToSciNotation';
import Button from '../Button/Button';
import './Keyboard.scss';

const Keyboard = ({
  calcState,
  setCalcState,
  setModalMessage,
}: {
  calcState: CalcState;
  setCalcState: React.Dispatch<React.SetStateAction<CalcState>>;
  setModalMessage: React.Dispatch<React.SetStateAction<ModalMessage>>;
}): JSX.Element => {
  const numbers: number[] = new Array(10).fill(0).map((_num: number, index: number) => index);
  const operations = [
    { name: 'minus', value: '-' },
    { name: 'plus', value: '+' },
    { name: 'division', value: '/' },
    { name: 'multiply', value: '*' },
  ];

  const handleNumBtnClick = (value: number | string): void => {
    if (calcState.currentValue === 'Error' || calcState.currentValue.length >= maxNumberOfDigits) {
      return;
    }

    if (calcState.currentValue === '0' || calcState.isEqualClicked) {
      setCalcState({ ...calcState, currentValue: `${value}`, isEqualClicked: false });
      return;
    }
    setCalcState({ ...calcState, currentValue: `${calcState.currentValue}${value}`, isEqualClicked: false });
  };

  const handleDotClick = (value: string | number): void => {
    if (calcState.currentValue === 'Error') {
      return;
    }

    const dot = value as string;
    if (calcState.currentValue.includes(dot)) {
      return;
    }

    setCalcState({ ...calcState, currentValue: `${calcState.currentValue}${dot}`, isEqualClicked: false });
  };

  const handleClearClick = (_value: string | number): void => {
    if (calcState.currentValue === '0') {
      setCalcState({
        currentValue: '0',
        prevValue: '',
        firstNum: null,
        secondNum: null,
        firstOperation: '',
        secondOperation: '',
        isEqualClicked: false,
      });
      return;
    }
    setCalcState({ ...calcState, currentValue: '0', isEqualClicked: false });
  };

  const handleOperatorClick = (value: string | number): void => {
    if (calcState.currentValue === 'Error') {
      return;
    }

    const operation = value as string;
    setCalcState({ ...calcState, ...handleOperation(operation, calcState), isEqualClicked: false });
  };

  const handleEqualClick = (_value: string | number): void => {
    setCalcState(getResult(calcState));
  };

  const handleLoadClick = async (_value: string | number): Promise<void> => {
    const loadedValue = await loadSavedResult();

    if (typeof loadedValue === 'number') {
      setCalcState({ ...calcState, currentValue: numToSciNotation(loadedValue) });
    }

    const errorMessage = loadedValue as ModalMessage;
    setModalMessage(errorMessage);
  };

  const handleSaveClick = async (_value: string | number): Promise<void> => {
    setModalMessage({ type: MODALTYPE.GENERAL, message: '...saving' });
    setModalMessage(await saveResult(calcState.currentValue));
  };
  return (
    <div className="keyboard">
      {numbers.map((number) => (
        <Button key={number} value={number} className={`btn btn-number btn-${number}`} handler={handleNumBtnClick} />
      ))}
      {operations.map((operator) => (
        <Button
          key={operator.name}
          value={operator.value}
          className={`btn btn-${operator.name}`}
          handler={handleOperatorClick}
        />
      ))}
      <Button value="." className="btn btn-dot" handler={handleDotClick} />
      <Button value="=" className="btn btn-equal" handler={handleEqualClick} />
      <Button
        value="save"
        className={`btn btn-save ${calcState.isEqualClicked ? '' : 'disabled'}`}
        handler={(value) => void handleSaveClick(value)}
      />
      <Button
        value="load"
        className="btn btn-load"
        handler={(value) => {
          void handleLoadClick(value);
        }}
      />
      <Button value="clear" className="btn btn-clear" handler={handleClearClick} />
    </div>
  );
};

export default Keyboard;
