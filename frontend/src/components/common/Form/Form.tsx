import React, { createContext } from 'react'

import { FormSettings, FormValues, TemplateViewProps } from 'FormTypes';

import FormManager from './FormManager/FormManager';
import FormTemplate from './FormTemplate/FormTemplate';

type Props = {
  settings: FormSettings;
  actionAfterSubmit: (values: FormValues) => void;
  isOnSubmit?: boolean;
}

export type FormContext = {
  currentFocusedInput: string;
  changeFocusedInput: (key: string) => void;
}

export const { Provider, Consumer } = createContext({
  currentFocusedInput: '',
  changeFocusedInput: (key: string) => {}
});

export const Form = ({settings, actionAfterSubmit, isOnSubmit, ...rest}: Props & TemplateViewProps) => (
  <FormManager settings={settings} actionAfterSubmit={actionAfterSubmit}>

    {(isFormDirty, isFormValid, currentFocusedInput, values, errors, handleTyping, handleSubmit, changeFocusedInput) => (
    <Provider value={{
      currentFocusedInput: currentFocusedInput,
      changeFocusedInput: changeFocusedInput
    }}>
      <FormTemplate 
        {...rest}
        isFormDirty={isFormDirty}
        isFormValid={isFormValid}
        values={values}
        errors={errors}
        settings={settings}
        onSubmit={handleSubmit}
        handleTyping={handleTyping}
        isOnSubmit={isOnSubmit}
      />
    </Provider>
    )}

  </FormManager>
);

export default Form;