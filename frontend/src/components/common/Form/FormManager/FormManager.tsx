import React, { FormEvent } from 'react';

import { FormValues, FormErrors } from '../types';
import { FormSettings } from '../Form';
import { initializeState, modifyFormError } from '../helpers';

type State = {
  values: FormValues;
  errors: FormErrors;
  isFormDirty: boolean;
  currentFocusedInput: string;
}

type Props = {
  settings: FormSettings;
  actionAfterSubmit: (values: FormValues) => void;
  children: (
    currentFocusedInput: string,
    values: FormValues,
    errors: FormErrors,
    updateValue: (key: string, value: any) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    changeFocusedInput: (key: string) => void
  ) => import('react').ReactNode;
}

const getInitialState = (settings: FormSettings): State => ({
  isFormDirty: false,
  currentFocusedInput: '',
  ...initializeState(settings)
});

class FormManager extends React.Component<Props, State> {

  state: State = getInitialState(this.props.settings);

  changeFocusedInput = (key: string): void => {
    console.log(key);
    this.setState({currentFocusedInput: key});
  }

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
    this.setState({isFormDirty: true});
    this.props.actionAfterSubmit(this.state.values);
  }

  render() {
    const { values, errors, currentFocusedInput } = this.state;
    return this.props.children(
      currentFocusedInput,
      values, 
      errors,
      this.updateValue, 
      this.handleSubmit,
      this.changeFocusedInput
    );
  }
}

export default FormManager;