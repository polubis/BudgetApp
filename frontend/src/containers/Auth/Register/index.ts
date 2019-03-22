import StoreTypes from 'StoreTypes';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { createAccount, cancelCreateAccount } from '../../../features/Auth/actions';
import { getIsCreatingAccount } from '../../../features/Auth/selectors';

import { CreateAccountPayload } from '../../../features/Auth/models';

import Register from './Register';

export interface IRegister {
  isCreatingAccount: boolean;
}

export interface IRegisterMethods {
  createAccount: (values: CreateAccountPayload) => void;
  cancelCreateAccount: () => void;
}

const mapStateToProps = (state: StoreTypes.RootState): IRegister => ({
  isCreatingAccount: getIsCreatingAccount(state.auth.authReducer)
});

const mapDispatchToProps = (dispatch: Dispatch<StoreTypes.RootAction>): IRegisterMethods => 
  bindActionCreators(
    {
      cancelCreateAccount,
      createAccount
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);