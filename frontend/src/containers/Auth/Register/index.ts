import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { createUser, authCancelled } from '../../../features/Auth/actions';
import { getIsCreatingAccount } from '../../../features/Auth/selectors';

import { CreateUserPayload } from '../../../features/Auth/models';
import { RootState, RootAction } from 'StoreTypes';

import Register from './Register';

export interface IRegister {
  isCreatingAccount: boolean;
}

export interface IRegisterMethods {
  createUser: (values: CreateUserPayload) => void;
  authCancelled: () => void;
}

const mapStateToProps = (state: RootState): IRegister => ({
  isCreatingAccount: getIsCreatingAccount(state.auth.authReducer)
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): IRegisterMethods => 
  bindActionCreators(
    {
      createUser,
      authCancelled
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);