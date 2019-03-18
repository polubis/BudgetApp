import React, { FormEvent } from 'react';

import FormGroup from './FormGroup/FormGroup';
import Button from '../../../ui/Button/Button';

import { FormValues, FormErrors, TemplateViewProps } from '../types';
import { FormSettings } from '../Form';

import './FormTemplate.scss';

type Props = {
  values: FormValues;
  errors: FormErrors;
  settings: FormSettings;
  updateValue: (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const FormTemplate = ({values, errors, updateValue, settings, onSubmit, btnTitle, btnClasses}: Props & TemplateViewProps) => {

  return (
    <form onSubmit={onSubmit}>

      {Object.keys(settings).map(key => (
        <FormGroup 
          {...settings[key].appearance}
          key={key}
          value={values[key]}
          errorsOccured={errors[key].errorsOccured}
          validationResult={errors[key].validationResult}
          updateValue={e => updateValue(key, e)}
        />
      ))}
      
      <Button 
        classes={btnClasses}
        title={btnTitle}
        action={onSubmit}
      />

    </form>
  );
}

export default FormTemplate;