import React from 'react';

import { FormSettings } from '../../../components/common/Form/types';

import Form from '../../../components/common/Form/Form';

import './Login.scss';

const LoginFormSettings: FormSettings = {
  email: {
    appearance: {title: 'email', icon: 'email'},
    logic: {value: '', validators: { required: true, minLength: 3, maxLength: 25 }}
  },
  password: {
    appearance: {title: 'password', icon: 'lock'},
    logic: {value: '', validators: { required: true, minLength: 5, maxLength: 25 } }
  }
}

const Login = () => (
  <Form 
    settings={LoginFormSettings}
    actionAfterSubmit={values => console.log(values)}
  />
);

export default Login;