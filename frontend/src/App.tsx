import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import StoreTypes from 'StoreTypes';
import { getLoggedUser } from './features/Auth/selectors';
import { User } from 'Entities';

import Home from './pages/Home/Home';
import Spinner from './components/ui/Spinner/Spinner';
import Alerts from './components/common/Alerts/Alerts';

type AppProps = {
  loggedUser: User | null;
}

const Main = Loadable({
  loader: () => import('./pages/Main/Main'),
  loading: Spinner,
  delay: 2000
});

class App extends Component<AppProps, any> {

  componentDidMount() {
    
  }

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

const mapStateToProps = (state: StoreTypes.RootState) => ({
  loggedUser: getLoggedUser(state.auth.authReducer)
});


export default connect(mapStateToProps, null)(App);
