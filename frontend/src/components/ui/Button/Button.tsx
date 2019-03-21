import React from 'react';

import Spinner from '../Spinner/Spinner';

import './Button.scss';

export type ButtonProps = {
  disabled?: boolean;
  id?: string;
  showLoader?: boolean;
  classes: string;
  title: string;
  size?: string; 
  action(params: any): any;
};

const Button = ({id, showLoader, classes, disabled, title, size, action}: ButtonProps) => (
  <button
    disabled={disabled}
    onClick={action} 
    id={id} 
    title={title} 
    className={`btn ${classes} ${showLoader ? 'btn--loading' : ''}`}
    style={{fontSize: size ? size + 'px' : 'initial'}}>
    
    {title}

    {showLoader && 
      <Spinner 
        positionClass='btn--spinner'
        sizeClass='spinner--small'
        appearanceClass='spinner--white' 
      />
    }
  </button>
);

export default Button;