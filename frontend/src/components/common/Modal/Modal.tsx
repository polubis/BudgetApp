import React from 'react';

import './Modal.scss';

interface ModalProps {
  close: any;
}

class Modal extends React.PureComponent<ModalProps> {

  componentDidMount(){
    document.addEventListener("keydown", this.onEscape, false);
  }

  onEscape = (e: KeyboardEvent) => {
    if(e.keyCode === 27) {
      this.props.close();
    }
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.onEscape, false);
  }

  render() {
    return (
      <>
        <div className='backdrop' />

        <div className='modal'>
        
        </div>
      </>
    );
  }
}

export default Modal;