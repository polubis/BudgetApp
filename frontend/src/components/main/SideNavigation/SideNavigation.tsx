import React from 'react';

import { Logo } from '../../ui/Logo/Logo';

import './SideNavigation.scss';

const SideNavigation = ({}) => (
  <aside className='side-navigation'>
    <div className='side-navigation__logo-wrap row-c-c'>
      <Logo width='30.91' height='30.66' />
    </div>
    <nav></nav>
  </aside>
);

export default SideNavigation;