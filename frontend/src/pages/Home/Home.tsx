import React from 'react';

import { LogoWithName } from '../../components/ui/Logo/Logo';
import { Link } from 'react-router-dom';

import Button from '../../components/ui/Button/Button';
import Guy from './assets/Guy.png';
import Auth from '../../containers/Auth/Auth';

import './Home.scss';

type State = Readonly<{ currentOpenedForm: string }>;

class Home extends React.Component<any, State> {
  readonly state: State = { currentOpenedForm: 'login' };

  _togleAuth = (formName: string): void => {
    this.setState({currentOpenedForm: formName});
  }

  render() {
    const { currentOpenedForm } = this.state;
    return (
      <div className='page' id='homepage'>

        <div className="top-bg-wrap" />
        <div className="bot-bg-wrap" />

        {currentOpenedForm && 
          <Auth 
            whichForm={currentOpenedForm}
            close={() => this._togleAuth('')}
          />
        }

        <header>
          <nav className='page__nav row-c'>
            <Link to='/'>
              <LogoWithName />
            </Link>

            <div className='page__nav__wrap row-c'>
              <Button action={() => this._togleAuth('register')} title='Register' classes='txt-btn txt-btn--l-font txt-btn--bold' />
              <Button action={() => this._togleAuth('login')} title='Sign In' classes='txt-btn txt-btn--main-font txt-btn--bold' />
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
              <Button action={() => {}} id='start-btn' title='Start' classes='bg-btn bg-btn--main bg-btn--rounded'/>
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