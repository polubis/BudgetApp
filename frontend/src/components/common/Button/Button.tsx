import React from 'react';

import './Button.scss';

interface ButtonProps {
  id?: string;
  classes: string;
  title: string;
  size?: string; 
};

const Button: React.SFC<ButtonProps>= ({id, classes, title, size}) => (
  <button id={id} title={title} className={'btn ' + classes}
    style={{fontSize: size ? size + 'px' : 'initial'}}>
    {title}
  </button>
);

export default Button;