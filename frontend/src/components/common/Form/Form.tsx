import React from 'react'

import { FormSettings, FormValues} from './types';

import FormManager from './FormManager/FormManager';
import FormTemplate from './FormTemplate/FormTemplate';

type Props = {
  settings: FormSettings;
  actionAfterSubmit: (values: FormValues) => void;
}

const Form: React.SFC<Props> = ({settings, actionAfterSubmit}) => (
  <FormManager settings={settings} actionAfterSubmit={actionAfterSubmit}>
    {(values, errors, updateValue, handleSubmit) => (
      <FormTemplate 
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