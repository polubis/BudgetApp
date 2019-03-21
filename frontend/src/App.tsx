import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Alerts from './components/common/Alerts/Alerts';

class App extends Component {
  render() {
    return (
      <>
        <Alerts />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
