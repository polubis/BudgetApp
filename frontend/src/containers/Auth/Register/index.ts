import StoreTypes from 'StoreTypes';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { createAccount } from '../../../features/Auth/actions';
import { clearAlerts } from '../../../features/Alerts/actions';
import { getIsCreatingAccount } from '../../../features/Auth/selectors';

import Register from './Register';

const mapStateToProps = (state: StoreTypes.RootState) => ({
  isCreatingAccount: getIsCreatingAccount(state.auth.authReducer)
});

const mapDispatchToProps = (dispatch: Dispatch<StoreTypes.RootAction>) => 
  bindActionCreators(
    {
      createAccount,
      clearAlerts
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);