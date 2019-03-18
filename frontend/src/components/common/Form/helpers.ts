import { FormSettings, FormValues, FormErrors, Validators, FormError, ValidationResult } from './types';
import { resolveValidation } from './validators';

export const initializeState = (formSettings: FormSettings): {values: FormValues, errors: FormErrors} => {
  const values: FormValues = {};
  const errors: FormErrors = {};

  Object.keys(formSettings).forEach(key => {
    values[key] = formSettings[key].logic.value;
    const validators: Validators = formSettings[key].logic.validators!;
    errors[key] = {
      errorsOccured: null,
      validationResult: validators ? Object.keys(validators).reduce((_, curr: string) => {
        return {[curr]: ''} 
      }, {}) : {}
    } 
  })
  return { values, errors };
}

export const modifyFormError = (value: any, title: string, validators: Validators): FormError => {
  let errorsOccured = false;
  const validatorsKeys = Object.keys(validators);
  const validationResult: ValidationResult = {};

  validatorsKeys.forEach(key => {
    validationResult[key] = resolveValidation(key, value, title, validators[key]);
    if (validationResult[key].isError) {
      errorsOccured = true;
    }
  });

  return {
    errorsOccured,
    validationResult
  };
} 