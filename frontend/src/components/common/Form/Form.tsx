import React from 'react'

import { FormSettings, FormValues, TemplateViewProps } from 'FormTypes';
import { Provider } from './context';

import FormManager from './FormManager/FormManager';
import FormTemplate from './FormTemplate/FormTemplate';

type Props = {
  settings: FormSettings;
  actionAfterSubmit: (values: FormValues) => void;
  isOnSubmit?: boolean;
}

export const Form = ({settings, actionAfterSubmit, isOnSubmit, ...rest}: Props & TemplateViewProps) => (

  <FormManager settings={settings} actionAfterSubmit={actionAfterSubmit}>

    {({currentFocusedInput, ...restState}, handleTyping, handleSubmit, changeFocusedInput) => (
    <Provider value={{
      currentFocusedInput: currentFocusedInput,
      changeFocusedInput: changeFocusedInput,
      handleTyping: handleTyping
    }}>
      <FormTemplate 
        {...rest}
        {...restState}
        settings={settings}
        onSubmit={handleSubmit}
        isOnSubmit={isOnSubmit}
      />
    </Provider>
    )}

  </FormManager>

);

export default Form;