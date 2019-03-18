import React, { createContext } from 'react'

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

export type FormContext = {
  currentFocusedInput: string;
  changeFocusedInput: (key: string) => void;
}

export const { Provider, Consumer } = createContext({
  currentFocusedInput: '',
  changeFocusedInput: (key: string) => {}
});

const Form = ({settings, actionAfterSubmit, ...rest}: Props & TemplateViewProps) => (
  <FormManager settings={settings} actionAfterSubmit={actionAfterSubmit}>

    {(currentFocusedInput, values, errors, updateValue, handleSubmit, changeFocusedInput) => (
    <Provider value={{
      currentFocusedInput: currentFocusedInput,
      changeFocusedInput: changeFocusedInput
    }}>
      <FormTemplate 
        {...rest}
        values={values}
        errors={errors}
        settings={settings}
        onSubmit={handleSubmit}
        updateValue={updateValue}
      />
    </Provider>
    )}

  </FormManager>
);

export default Form;