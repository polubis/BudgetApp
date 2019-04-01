import React from 'react';

import InsightSearcher from './InsightSearcher/InsightSearcher';
import Button from '../../ui/Button/Button';
import SalaryCounter from './SalaryCounter/SalaryCounter';

import './Navbar.scss';

const Navbar = ({}) => (
  <header className='main-navbar'>

    <InsightSearcher />

    <nav>
      <Button 
        title='constant expenses'
        icon='add_shopping_cart'
        action={() => {}}
      />
      <Button 
        title='add month'
        icon='add_circle_outline'
        action={() => {}}
      />
    </nav>

    <SalaryCounter />

  </header>
);

export default Navbar;