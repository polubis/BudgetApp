import StoreTypes from 'StoreTypes';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { logIn, authCancelled } from '../../../features/Auth/actions';
import { getIsInAuthProcess } from '../../../features/Auth/selectors';
import { LogInPayload } from '../../../features/Auth/models';

import Login from './Login';

export interface ILogin {
  isInAuthProcess: boolean;
}

export interface ILoginMethods {
  logIn: (values: LogInPayload) => void;
  authCancelled: () => void;
}

const mapStateToProps = (state: StoreTypes.RootState): ILogin => ({
  isInAuthProcess: getIsInAuthProcess(state.auth.authReducer)
});

const mapDispatchToProps = (dispatch: Dispatch<StoreTypes.RootAction>): ILoginMethods => 
  bindActionCreators(
    {
      logIn,
      authCancelled
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);