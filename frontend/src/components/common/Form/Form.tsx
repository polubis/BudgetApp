import React from 'react'

import { FormSetting, FormValues, TemplateViewProps } from './types';

import FormManager from './FormManager/FormManager';
import FormTemplate from './FormTemplate/FormTemplate';

type Props = {
  settings: FormSettings;
  actionAfterSubmit: (values: FormValues) => void;
}

export type FormSettings = {
  [key: string] : FormSetting;
}

const Form = ({settings, actionAfterSubmit, ...rest}: Props & TemplateViewProps) => (
  <FormManager settings={settings} actionAfterSubmit={actionAfterSubmit}>

    {(values, errors, updateValue, handleSubmit) => (
      <FormTemplate 
        {...rest}
        values={values}
        errors={errors}
        settings={settings}
        onSubmit={handleSubmit}
        updateValue={updateValue}
      />
    )}

  </FormManager>
);

export default Form;