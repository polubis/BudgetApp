import React from 'react';
import StoreTypes from 'StoreTypes';

import Form from '../../../components/common/Form/Form';
import RegisterFormSettings from './index';

import { createAccount } from '../../../features/Auth/actions';
import { CreateAccountPayload } from '../../../features/Auth/models';
import { getIsCreatingAccount } from '../../../features/Auth/selectors';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import './Register.scss';

type RegisterProps = {
  createAccount: (values: CreateAccountPayload) => any;
  isCreatingAccount: boolean;
}

const Register = ({createAccount, isCreatingAccount}: RegisterProps) => (
  <Form 
    formClass='register-form col'
    btnTitle='Submit'
    btnClasses='bg-btn bg-btn--main btn--medium login-btn'
    settings={RegisterFormSettings}
    actionAfterSubmit={values => createAccount(values as CreateAccountPayload)}
    isOnSubmit={isCreatingAccount}
  />
);

const mapStateToProps = (state: StoreTypes.RootState) => ({
  isCreatingAccount: getIsCreatingAccount(state.auth.authReducer)
});

const mapDispatchToProps = (dispatch: Dispatch<StoreTypes.RootAction>) => 
  bindActionCreators(
    {
      createAccount
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);