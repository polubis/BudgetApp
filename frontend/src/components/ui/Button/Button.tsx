import React from 'react';

import Spinner from '../Spinner/Spinner';

import './Button.scss';
import MaterialIcon from '@material/react-material-icon';

type ButtonProps = {
  disabled?: boolean; 
  id?: string;
  showLoader?: boolean;
  classes?: string;
  icon?: string;
  title: string;
  action(params: any): any;
};


const Button = ({id, showLoader, classes = 'bg-btn bg-btn--main operation-btn', disabled, title, action, icon}: ButtonProps) => (
  <button
    disabled={disabled}
    onClick={action} 
    id={id} 
    title={title} 
    className={`btn ${classes} ${showLoader ? 'btn--loading' : ''}`}
  >
    
    {icon && 
      <MaterialIcon 
        icon={icon}
      />
    }

    <span>
      {title}
    </span>

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