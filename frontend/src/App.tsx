import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Loadable from 'react-loadable';
import Spinner from './components/ui/Spinner/Spinner';

const Home = Loadable({
  loader: () => import('./pages/Home/Home'),
  loading: Spinner
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
