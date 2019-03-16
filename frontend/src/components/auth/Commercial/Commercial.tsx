import React from 'react';

import './Commercial.scss';

type CommercialProps = {
  commercialKey: string;
  imagePath: string;
}

type CommercialSettingsFor = {
  [key: string]: {
    arrowClass: string;
  }
}

const commercialSettingsFor: CommercialSettingsFor = {
  login: {
    arrowClass: 'arrow-rectangle--login'
  },
  register: {
    arrowClass: 'arrow-rectangle--register'
  } 
}

const Commercial: React.SFC<CommercialProps> = ({commercialKey, imagePath}) => (
  <div style={{backgroundImage: `url(${imagePath})`}} className='commercial'>
    

    <div className={`arrow-rectangle ${commercialSettingsFor[commercialKey].arrowClass}`} />

    <div className='commercial__content'>

    </div>
  </div>
);

export default Commercial;
