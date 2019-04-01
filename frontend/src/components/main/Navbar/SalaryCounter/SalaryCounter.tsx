import React from 'react';

import './SalaryCounter.scss';

const SalaryCounter = ({budget = '2000.03', spend = '1000.23'}) => {
  const percentageRatio = ((+spend / +budget) * 100).toFixed(2);

  return (
    <div className='salary-counter'>

      <div className='salary-counter__spend'>
        <span>you spend</span>
        <span> {spend} $</span>
      </div>

      <span className='salary-counter__budget'>{budget} $</span>
      
      <div className='salary-counter__progress' style={{width: `${percentageRatio}%`}} />

    </div>
  );
}

export default SalaryCounter;