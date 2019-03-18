import React, { Component } from 'react';

import MaterialIcon from '@material/react-material-icon';
import ValidationErrors from './ValidationErrors/ValidationErrors';

import { FormAppearanceSetting, ValidationResult } from '../../types';

import './FormGroup.scss';

type Props = {
  updateValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  errorsOccured?: boolean | null;
  validationResult: ValidationResult;
}

class FormGroup extends Component<Props & FormAppearanceSetting, any> {

  shouldComponentUpdate({value, validationResult}: Props & FormAppearanceSetting) {
    if (value !== this.props.value || validationResult !== this.props.validationResult) {
      return true;
    }
    return false;
  }

  selectGroupClassByErrorsOccured = (): string => {
    const { errorsOccured } = this.props;
    return errorsOccured === null ? 'form-group__content--initial' 
      : errorsOccured ? 'form-group__content--error' : 'form-group__content--ok';
  }



  render() {
    const { value, errorsOccured, validationResult, updateValue, icon, title, placeholder } = this.props;
    
    return (
    <section className='form-group'>

      <label htmlFor={title} className='form-group__label'>{title}</label>

      <div className={`form-group__content ${this.selectGroupClassByErrorsOccured()}`}>
        <input 
          id={title}
          value={value || ''}
          className='content__item'
          onChange={updateValue}
          type='text' 
          placeholder={placeholder || 'type your ' + title + '...'} 
        />

        {icon && 
          <div className='content__rect row-c-c'>
            <MaterialIcon icon={icon} />
          </div>
        }

        {errorsOccured && 
          <ValidationErrors 
            validationResult={validationResult}
          />
        }

      </div>

      </section>
    );
  }
}

export default FormGroup;