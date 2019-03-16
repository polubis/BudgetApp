import React from 'react';

import './Commercial.scss';

type CommercialProps = {
  commercialKey: string;
  imagePath: string;
}

type CommercialSettingsFor = {
  [key: string]: {
    arrowClass: string;
    component(): JSX.Element;
  }
}

const commercialSettingsFor: CommercialSettingsFor = {
  login: {
    arrowClass: 'arrow-rectangle--login',
    component: () => <LoginCommercial />
  },
  register: {
    arrowClass: 'arrow-rectangle--register',
    component: () => <RegisterCommercial />
  } 
}

const Commercial: React.SFC<CommercialProps> = ({commercialKey, imagePath}) => (
  <div style={{backgroundImage: `url(${imagePath})`}} className='commercial'>
    <div className={`arrow-rectangle ${commercialSettingsFor[commercialKey].arrowClass}`} />
    <div className='commercial__content'>
      {commercialSettingsFor[commercialKey].component()}
    </div>
  </div>
);

const RegisterCommercial = () => (
  <div className='content__register'>
    <h1>Manage your finances and increase your savings</h1>
    <p>- log in and populate basic informations</p>
    <p>- populate your salary and specify money limit</p>
    <p>- add expenditure and take rest</p>
    <p>- our system will perform calculations and present statistics to you</p>
    <p>- let us generate report in csv file and download it on your computer</p>
  </div>
);

const LoginCommercial = () => (
  <div className='content__login'>
    <h2>Policy informations</h2>
    <article>
      By clicking submit button you accept the 
      Budget Bot web application regulations. Read 
      rules before create account. You 
      can always delete the account which is 
      deleting all data for usage purposes.
    </article>
  </div>
)

export default Commercial;
