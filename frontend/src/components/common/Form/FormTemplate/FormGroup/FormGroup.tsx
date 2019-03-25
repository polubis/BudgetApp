import React, { Component } from 'react';

import MaterialIcon from '@material/react-material-icon';
import ValidationErrors from './ValidationErrors/ValidationErrors';

import { FormAppearanceSetting, ValidationResult } from 'FormTypes';
import { Consumer, FormContext } from '../../context';

import './FormGroup.scss';

type Props = {
  id: string;
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
    const { id, value, errorsOccured, validationResult, icon, title, placeholder } = this.props;
    return (
      <Consumer>
        {({currentFocusedInput, changeFocusedInput, handleTyping}: FormContext) => (
          <section id={id} className='form-group'>
            <label htmlFor={title} className='form-group__label'>{title}</label>

            <div className={`form-group__content ${this.selectGroupClassByErrorsOccured()}`}>

              <input 
                autoComplete='off'
                id={title}
                value={value}
                className='content__item'
                onChange={e => handleTyping(id, e)}
                onFocus={() => changeFocusedInput(id)}
                onBlur={() => changeFocusedInput('')}
                type='text' 
                placeholder={placeholder || 'type your ' + title + '...'} 
              />

              {icon && 
                <div className='content__rect row-c-c'>
                  <MaterialIcon icon={icon} />
                </div>
              }

              {(errorsOccured && currentFocusedInput === id) && 
                <ValidationErrors 
                  closeValidationErrors={() => changeFocusedInput('')}
                  validationResult={validationResult}
                />
              }

            </div>

          </section>
        )}
      </Consumer>
    );
  }
}

export default FormGroup;