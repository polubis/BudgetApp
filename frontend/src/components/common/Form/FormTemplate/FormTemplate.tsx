import React, { FormEvent } from 'react';

import FormGroup from './FormGroup/FormGroup';
import Button from '../../../ui/Button/Button';

import { FormSettings, FormValues, FormErrors } from '../types';

import './FormTemplate.scss';

type Props = {
  values: FormValues;
  errors: FormErrors;
  settings: FormSettings;
  updateValue: (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void; 
}

const FormTemplate = ({values, errors, updateValue, settings, onSubmit}: Props) => (
  <form onSubmit={onSubmit}>
    {Object.keys(settings).map(key => (
      <FormGroup 
        key={key}
        icon={settings[key].appearance.icon}
        placeholder={settings[key].appearance.placeholder}
        title={settings[key].appearance.title}
        value={values[key]}
        errorsOccured={errors[key].errorsOccured}
        validationResult={errors[key].validationResult}
        updateValue={e => updateValue(key, e)}
      />
    ))}

    <Button 
      classes='btn bg-btn--main'
      title='Log in'
      action={onSubmit}
    />

  </form>
);

export default FormTemplate;