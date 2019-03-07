import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Loadable from 'react-loadable';

export const loading = () => {
  return <div>Loading...</div>;
}

const Home = Loadable({
  loader: () => import('./pages/Home/Home'), loading
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
