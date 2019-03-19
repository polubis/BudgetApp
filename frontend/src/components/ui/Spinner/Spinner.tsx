import React from 'react';

import './Spinner.scss';

type Props = {
  positionClass: string,
  appearanceClass: string,
  sizeClass: string
}

const Spinner = ({positionClass = 'centered', appearanceClass='spinner--main', sizeClass = 'spinner--medium'}: Props & any) => {
  return (
    <div className={`spinner ${positionClass} ${appearanceClass} ${sizeClass}`}>
      <div className='spinner__circle' />
    </div>
  );
};

export default Spinner;