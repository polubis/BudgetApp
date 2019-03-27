import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import StoreTypes from 'StoreTypes';
import { getLoggedUser } from './features/Auth/selectors';
import { User } from 'Entities';

import Home from './pages/Home/Home';
import Alerts from './components/common/Alerts/Alerts';
import WithLazyLoading from './hoc/WithLazyLoading';

const Main = WithLazyLoading(() => import('./pages/Main/Main'));

type AppProps = {
  loggedUser: User | null;
}

class App extends Component<AppProps, any> {

  renderContent = () => this.props.loggedUser ? <Main /> : <Home />;

  render() {
    return (
      <>
        <Alerts />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={this.renderContent} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default connect((state: StoreTypes.RootState) => ({
  loggedUser: getLoggedUser(state.auth.authReducer)
}), null)(App);
