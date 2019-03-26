import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { createAccount, authCancelled } from '../../../features/Auth/actions';
import { getIsCreatingAccount } from '../../../features/Auth/selectors';

import { CreateAccountPayload } from '../../../features/Auth/models';
import { RootState, RootAction } from 'StoreTypes';

import Register from './Register';

export interface IRegister {
  isCreatingAccount: boolean;
}

export interface IRegisterMethods {
  createAccount: (values: CreateAccountPayload) => void;
  authCancelled: () => void;
}

const mapStateToProps = (state: RootState): IRegister => ({
  isCreatingAccount: getIsCreatingAccount(state.auth.authReducer)
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): IRegisterMethods => 
  bindActionCreators(
    {
      createAccount,
      authCancelled
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);