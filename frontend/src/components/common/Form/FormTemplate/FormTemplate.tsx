import React, { FormEvent } from 'react';

import FormGroup from './FormGroup/FormGroup';
import Button from '../../../ui/Button/Button';

import { FormSettings, FormValues, FormErrors, TemplateViewProps } from 'FormTypes';

import './FormTemplate.scss';

type Props = {
  formClass?: string;
  isOnSubmit?: boolean;
  isFormValid: boolean;
  isFormDirty: boolean;
  values: FormValues;
  errors: FormErrors;
  settings: FormSettings;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const FormTemplate = ({isFormValid, isFormDirty, values, errors, settings, 
  onSubmit, btnTitle, btnClasses, formClass, isOnSubmit}: Props & TemplateViewProps) => (
    
  <form className={formClass} onSubmit={onSubmit}>

    <div className='form-content'>
      {Object.keys(settings).map(key => (
        <FormGroup 
          {...settings[key].appearance}
          key={key}
          id={key}
          value={values[key]}
          errorsOccured={errors[key].errorsOccured}
          validationResult={errors[key].validationResult}
        />
      ))}
    </div>

    <Button 
      disabled={isFormDirty && !isFormValid}
      showLoader={isOnSubmit}
      classes={btnClasses}
      title={btnTitle}
      action={onSubmit}
    />

  </form>
)

export default FormTemplate;