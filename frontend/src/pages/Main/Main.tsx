import React from 'react';

import SideNavigation from '../../components/main/SideNavigation/SideNavigation';
import Navbar from '../../components/main/Navbar/Navbar';

import './Main.scss';

class Main extends React.Component {
  render() {
    return (
      <div id='main-app'>

        <Navbar />

        <SideNavigation />

        <main>
            s
        </main>
      </div>
    );
  }
}

export default Main;