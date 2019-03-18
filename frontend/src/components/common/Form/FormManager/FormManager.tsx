import React, { FormEvent } from 'react';

import { FormValues, FormErrors } from '../types';
import { FormSettings } from '../Form';
import { initializeState, modifyFormError } from '../helpers';

type State = {
  values: FormValues;
  errors: FormErrors;
  isFormDirty: boolean;
}

type Props = {
  settings: FormSettings;
  actionAfterSubmit: (values: FormValues) => void;
  children: (
    values: FormValues,
    errors: FormErrors,
    updateValue: (key: string, value: any) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  ) => import('react').ReactNode;
}

const getInitialState = (settings: FormSettings): State => ({
  isFormDirty: false,
  ...initializeState(settings)
});

class FormManager extends React.Component<Props, State> {

  state: State = getInitialState(this.props.settings);

  updateValue = (key: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    const { logic, appearance } = this.props.settings[key];
    const values: FormValues = {...this.state.values, [key]: e.target.value};
    const errors: FormErrors = {
      ...this.state.errors, 
      [key]: logic.validators ? modifyFormError(e.target.value, appearance.title, logic.validators ) : 
        this.state.errors[key]
    };

    this.setState({values, errors});
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.actionAfterSubmit(this.state.values);
  }

  render() {
    const { values, errors } = this.state;
    return this.props.children(
      values, 
      errors,
      this.updateValue, 
      this.handleSubmit
    );
  }
}

export default FormManager;