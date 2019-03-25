import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { RootAction, RootState } from 'StoreTypes';
import { getCookie } from '../services/cookies-service';
import { getAuthData, getAuthDataFailure } from '../features/Auth/actions';
import { getIsGettingUserData } from '../features/Auth/selectors';

const mapStateToProps = ({auth}: RootState) => ({
  isGettingAuthData: getIsGettingUserData(auth.authReducer)
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators({
    getAuthData,
    getAuthDataFailure
  }, dispatch);

interface InjectedProps {
  dispatch: Dispatch;
  isGettingAuthData: boolean;
  getAuthData: (token: string) => RootAction;
}  
  
export default <P extends object>(Component: ComponentType<P>) => {

  const token = getCookie('token');

  const withAuthRehydrate = ({getAuthData, getAuthDataFailure, dispatch, isGettingAuthData, ...props}: P & InjectedProps | any) => {

    useEffect(() => {
      if (token) {
        getAuthData(token);
      }
      else {
        getAuthDataFailure();
      }
    }, []);

    if (isGettingAuthData) {
      return null;
    }

    return <Component {...props as P} />;
  }

  
  return connect(mapStateToProps, mapDispatchToProps)(withAuthRehydrate);
}