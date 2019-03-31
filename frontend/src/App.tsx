import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import StoreTypes from 'StoreTypes';
import { getLoggedUser } from './features/Auth/selectors';
import { User } from 'Entities';

import Alerts from './components/common/Alerts/Alerts';
import WithLazyLoading from './hoc/WithLazyLoading';

const Main = WithLazyLoading(() => import('./pages/Main/Main'));
const Home = WithLazyLoading(() => import('./pages/Home/Home'));

type AppProps = {
  loggedUser: User | null;
}

const renderContent = (loggedUser: User | null) => loggedUser ? <Main /> : <Home />;

const App = ({loggedUser}: AppProps) =>
  <>
    <Alerts />
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => renderContent(loggedUser)} />
      </Switch>
    </BrowserRouter>
  </>

export default connect((state: StoreTypes.RootState) => ({
  loggedUser: getLoggedUser(state.auth.authReducer)
}), null)(App);
