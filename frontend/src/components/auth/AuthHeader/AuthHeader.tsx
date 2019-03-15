import React from 'react';

import './AuthHeader.scss';

type AuthHeaderProps = {
  message: string;
  logInClass?: string;
  registerClass?: string;
}

const AuthHeader: React.SFC<AuthHeaderProps> = ({message, logInClass, registerClass}) => (
  <h2 className='auth-header l-font-color'>
    <div>
      <span className={logInClass}>Login</span>
      <span> / </span>
      <span className={registerClass}>Register </span>
    </div>
    <span className='auth-header__sub-title'>
      {message}
    </span>
  </h2>
);

export default AuthHeader;