import React from 'react';

import './AuthHeader.scss';

type AuthHeaderProps = {
  message: string;
  logInClass?: string;
  registerClass?: string;
  action(): void;
}

const AuthHeader = ({message, logInClass, registerClass, action}: AuthHeaderProps) => (
  <h2 className='auth-header l-font-color'>
    <div onClick={action}>
      <span className={`${logInClass} click`}>Login</span>
      <span> / </span>
      <span className={`${registerClass} click`}>Register </span>
    </div>
    <span className='auth-header__sub-title'>
      {message}
    </span>
  </h2>
);

export default AuthHeader;