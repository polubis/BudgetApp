import React from 'react';

import { LogoWithName } from '../../components/common/Logo/Logo';
import { Link } from 'react-router-dom';

import Button from '../../components/common/Button/Button';
import Guy from './assets/Guy.png';

import './Home.scss';

class Home extends React.Component<{}> {

  render() {

    return (
      <div className='page' id='homepage'>

        <div className="top-bg-wrap" />
        <div className="bot-bg-wrap" />

        <header>
          <nav className='page__nav row-c'>
            <Link to='/'>
              <LogoWithName />
            </Link>

            <div className='page__nav__wrap row-c'>
              <Button title='Register' classes='txt--btn txt--btn--l-font txt--btn-bold' />
              <Button title='Sign In' classes='txt--btn txt--btn--main-font txt--btn-bold' />
            </div>
          </nav>
        </header>

        <main className="home-main">
          <div className='home-main__content'>
            <div className="page-header">
              <p className="page-header__sub l-font-color">Start be rich with <span className='main-color'>Budget Bot</span></p>
              <h1 className="page-header__title">
                Manage your home budget <br/> in easy way
              </h1>
              <Button id='start-btn' title='Start' classes='bg--btn bg--btn-main bg--btn-rounded'/>
            </div>
            <div id='guy-image'>
              <img src={Guy} />
            </div>
          </div>
          
        </main>
      </div>
    );
  }
}

export default Home;