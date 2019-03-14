import React from 'react';

import { LogoWithName } from '../../components/ui/Logo/Logo';
import { Link } from 'react-router-dom';

import Loadable from 'react-loadable';
import Button from '../../components/ui/Button/Button';
import Guy from './assets/Guy.png';
import Spinner from '../../components/ui/Spinner/Spinner';

import './Home.scss';

const Login = Loadable({
  loader: () => import('../../containers/Login/Login'),
  loading: Spinner
});

const initialState = { wantLogIn: false };

type State = Readonly<typeof initialState>;

class Home extends React.Component<State, any> {
  readonly state: State = initialState;

  private togleLogIn = (): void => {
    Login.preload();
    this.setState({wantLogIn: !this.state.wantLogIn});
  }

  render() {
    return (
      <div className='page' id='homepage'>

        <div className="top-bg-wrap" />
        <div className="bot-bg-wrap" />

        {this.state.wantLogIn && 
          <Login 
            close={this.togleLogIn}
          />
        }

        <header>
          <nav className='page__nav row-c'>
            <Link to='/'>
              <LogoWithName />
            </Link>

            <div className='page__nav__wrap row-c'>
              <Button action={() => {}} title='Register' classes='txt-btn txt-btn--l-font txt-btn--bold' />
              <Button action={this.togleLogIn} title='Sign In' classes='txt-btn txt-btn--main-font txt-btn--bold' />
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