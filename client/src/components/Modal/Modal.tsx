import React from 'react';
import { ModalMessage, MODALTYPE } from '../../interfaces';
import './Modal.scss';
import { IoCloseSharp } from 'react-icons/io5';

const Modal = ({
  modalMessage,
  setModalMessage,
}: {
  modalMessage: ModalMessage;
  setModalMessage: React.Dispatch<React.SetStateAction<ModalMessage>>;
}): JSX.Element => {
  const handleCloseClick = (): void => {
    setModalMessage({ type: '', message: '' });
  };

  return (
    <div className="modal">
      <div className="message-ctn">
        {(modalMessage.type === MODALTYPE.ERROR || modalMessage.type === MODALTYPE.SUCCEEDED) && (
          <IoCloseSharp className="closeIcon" onClick={handleCloseClick} />
        )}
        <p className={modalMessage.type}>{modalMessage.message}</p>
      </div>
    </div>
  );
};

export default Modal;
