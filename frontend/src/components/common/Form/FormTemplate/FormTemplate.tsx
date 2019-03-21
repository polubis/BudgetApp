import React, { FormEvent } from 'react';

import FormGroup from './FormGroup/FormGroup';
import Button from '../../../ui/Button/Button';

import { FormValues, FormErrors, TemplateViewProps } from '../types';
import { FormSettings } from '../Form';

import './FormTemplate.scss';

type Props = {
  formClass?: string;
  isOnSubmit?: boolean;
  isFormValid: boolean;
  isFormDirty: boolean;
  values: FormValues;
  errors: FormErrors;
  settings: FormSettings;
  handleTyping: (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const FormTemplate = ({isFormValid, isFormDirty, values, errors, handleTyping, settings, 
  onSubmit, btnTitle, btnClasses, formClass, isOnSubmit}: Props & TemplateViewProps) => {

  return (
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
            handleTyping={e => handleTyping(key, e)}
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
  );
}

export default FormTemplate;