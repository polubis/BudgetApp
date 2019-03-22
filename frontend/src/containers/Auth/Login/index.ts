import StoreTypes from 'StoreTypes';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { tryLogIn } from '../../../features/Auth/actions';
import { getIsInAuthProcess, getLoggedUser } from '../../../features/Auth/selectors';
import { User } from 'Entities';
import { LogInPayload } from '../../../features/Auth/models';

import Login from './Login';

export interface ILogin {
  isInAuthProcess: boolean;
  loggedUser: User | null;
}

export interface ILoginMethods {
  tryLogIn: (values: LogInPayload) => void;
}

const mapStateToProps = (state: StoreTypes.RootState): ILogin => ({
  isInAuthProcess: getIsInAuthProcess(state.auth.authReducer),
  loggedUser: getLoggedUser(state.auth.authReducer),
});

const mapDispatchToProps = (dispatch: Dispatch<StoreTypes.RootAction>): ILoginMethods => 
  bindActionCreators(
    {
      tryLogIn
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);