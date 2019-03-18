import React from 'react';

import './Button.scss';

export interface ButtonProps {
  id?: string;
  classes: string;
  title: string;
  size?: string; 
  action(params: any): any;
};

const Button: React.SFC<ButtonProps> = ({id, classes, title, size, action}) => (
  <button 
    onClick={action} 
    id={id} 
    title={title} 
    className={'btn ' + classes}
    style={{fontSize: size ? size + 'px' : 'initial'}}>
    
    {title}
  </button>
);

export default Button;