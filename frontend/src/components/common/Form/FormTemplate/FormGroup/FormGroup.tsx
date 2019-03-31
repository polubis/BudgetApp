import React from 'react';

import ValidationErrors from './ValidationErrors/ValidationErrors';
import FormInput from './FormInput/FormInput';

import { FormAppearanceSetting, ValidationResult } from 'FormTypes';
import { Consumer, FormContext } from '../../context';

import './FormGroup.scss';

type Props = {
  id: string;
  value: any;
  errorsOccured?: boolean | null;
  validationResult: ValidationResult;
}

const selectGroupClassByErrorsOccured = (errorsOccured?: boolean | null) => 
  errorsOccured === null ? 'form-group__content--initial' 
    : errorsOccured ? 'form-group__content--error' : 'form-group__content--ok';

const FormGroup = ({id, value, errorsOccured, validationResult, icon, title, placeholder, inputSettings}: Props & FormAppearanceSetting) => {

  const contentClass = selectGroupClassByErrorsOccured(errorsOccured);

  return (
    <Consumer>
      {({currentFocusedInput, changeFocusedInput, handleTyping}: FormContext) => (
        <section id={id} className='form-group'>

          <label htmlFor={title} className='form-group__label'>{title}</label>

          <FormInput 
            icon={icon}
            contentClasses={contentClass}
            renderInput={() => (
              <input 
                className='content__item'
                id={title}
                autoComplete='off'
                placeholder={placeholder || 'type your ' + title + '...'} 
                {...inputSettings}
                value={value}
                onChange={e => handleTyping(id, e)}
                onFocus={() => changeFocusedInput(id)}
                onBlur={() => changeFocusedInput('')}
              />
            )}
            renderValidation={() => 
              (errorsOccured && currentFocusedInput === id) ? 
                <ValidationErrors 
                  closeValidationErrors={() => changeFocusedInput('')}
                  validationResult={validationResult}
                />
              : null
            }
          />

        </section>
      )}
    </Consumer>
  );
}

export default FormGroup;