import React from 'react';

import { LogoWithName } from '../../components/common/Logo/Logo';

import MaterialIcon from '@material/react-material-icon';
import Button from '../../components/common/Button/Button';

import './Home.scss';

class Home extends React.Component<{}> {

  render() {

    return (
      <div className='page' id='homepage'>
        
        <header>

          <nav className='page__nav row-c'>
            <LogoWithName />

            <div className='page__nav__wrap row-c'>
              <Button title='Register' classes='txt--btn txt--btn--l-font' />
              <Button title='Sign In' classes='txt--btn txt--btn--main-font' />
            </div>


          </nav>

        </header>
      </div>
    );
  }
}

export default Home;