import React, { FormEvent } from 'react';

import { IFormManager, FormSettings, FormValues, FormErrors } from 'FormTypes';
import { initializeState, modifyFormError, modifyFormErrors } from '../helpers';

type Props = {
  settings: FormSettings;
  actionAfterSubmit: (values: FormValues) => void;
  children: (
    injectedState: IFormManager,
    handleTyping: (key: string, value: any) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    changeFocusedInput: (key: string) => void
  ) => React.ReactNode;
}

const getInitialState = (settings: FormSettings): IFormManager => ({
  isFormDirty: false,
  isFormValid: true,
  currentFocusedInput: '',
  ...initializeState(settings)
});

class FormManager extends React.Component<Props, IFormManager> {

  state: IFormManager = getInitialState(this.props.settings);

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
    const { errorOccuredIn, errors } = modifyFormErrors(
      this.state.values, 
      this.state.errors,
      this.props.settings
    );

    const isFormValid = !errorOccuredIn;

    if (isFormValid) {
      this.props.actionAfterSubmit(this.state.values);
    }

    this.setState({errors, isFormDirty: true, isFormValid, currentFocusedInput: errorOccuredIn});
  }

  render() {
    return this.props.children(
      this.state,
      this.handleTyping, 
      this.handleSubmit,
      this.changeFocusedInput
    );
  }
}

export default FormManager;