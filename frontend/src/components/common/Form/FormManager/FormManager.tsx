import React, { FormEvent } from 'react';

import { FormSettings, FormValues, FormErrors } from 'FormTypes';
import { initializeState, modifyFormError, modifyFormErrors } from '../helpers';

type State = {
  values: FormValues;
  errors: FormErrors;
  isFormDirty: boolean;
  isFormValid: boolean;
  currentFocusedInput: string;
}

type Props = {
  settings: FormSettings;
  actionAfterSubmit: (values: FormValues) => void;
  children: (
    isFormDirty: boolean,
    isFormValid: boolean,
    currentFocusedInput: string,
    values: FormValues,
    errors: FormErrors,
    handleTyping: (key: string, value: any) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    changeFocusedInput: (key: string) => void
  ) => import('react').ReactNode;
}

const getInitialState = (settings: FormSettings): State => ({
  isFormDirty: false,
  isFormValid: true,
  currentFocusedInput: '',
  ...initializeState(settings)
});

class FormManager extends React.Component<Props, State> {

  state: State = getInitialState(this.props.settings);

  changeFocusedInput = (key: string): void => this.setState({currentFocusedInput: key});

  handleTyping = (key: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    const { logic, appearance } = this.props.settings[key];
    const values: FormValues = {...this.state.values, [key]: e.target.value};
    const errors: FormErrors = {
      ...this.state.errors, 
      [key]: logic.validators ? modifyFormError(e.target.value, appearance.title, logic.validators ) : 
        this.state.errors[key]
    };

    if (this.state.isFormDirty) {
      this.setState({
        isFormValid: !Object.values(errors).find(error => error.errorsOccured === true)
      });
    }

    this.setState({values, errors});
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { areValuesValid, errors } = modifyFormErrors(
      this.state.values, 
      this.state.errors,
      this.props.settings
    );

    if (areValuesValid) {
      this.props.actionAfterSubmit(this.state.values);
    }

    this.setState({errors, isFormDirty: true, isFormValid: areValuesValid});
  }

  render() {
    const { values, errors, currentFocusedInput, isFormDirty, isFormValid } = this.state;
    return this.props.children(
      isFormDirty,
      isFormValid,
      currentFocusedInput,
      values, 
      errors,
      this.handleTyping, 
      this.handleSubmit,
      this.changeFocusedInput
    );
  }
}

export default FormManager;