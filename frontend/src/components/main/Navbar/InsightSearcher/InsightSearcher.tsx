import React from 'react';

import FormInput from '../../../common/Form/FormTemplate/FormGroup/FormInput/FormInput';

import './InsightSearcher.scss';

const InsightSearcher = ({}) => (
  <div className='insight-searcher'>
    <FormInput 
      icon='search'
      renderInput={() => (
        <input 
          autoFocus
          spellCheck={false}
          className='content__item'
          autoComplete='off'
          placeholder='type insight id, name or date' 
        />
      )}
    />
  </div>
);

export default InsightSearcher;