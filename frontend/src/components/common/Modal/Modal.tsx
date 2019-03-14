import React, { useEffect } from 'react';

import './Modal.scss';

interface ModalProps {
  close: any;
  children: React.ReactElement;
}

const Modal: React.SFC<ModalProps> = ({close, children}) => {
  useEffect(() => {

    const onEsape = (e: KeyboardEvent) => {
      if (e.keyCode === 27) close();
    };

    document.addEventListener("keydown", onEsape, false);

    return () => {
      document.removeEventListener("keydown", onEsape, false);
    }
  }, []);

  return (
    <>
      <div onClick={close} className='backdrop' />

      <div className='modal centered'>
        {children}
      </div>
    </>
  );
}

export default Modal;