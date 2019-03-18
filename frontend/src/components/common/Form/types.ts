export type FormSettings = {
  [key: string] : FormSetting;
}

export type FormSetting = {
  appearance: FormAppearanceSetting;
  logic: FormLogicSetting;
}

export type FormAppearanceSetting = {
  title: string;
  placeholder?: string;
  icon?: string;
}

export type FormLogicSetting = {
  value: any;
  validators?: Validators
} 

export type Validators = {
  [key: string] : any;
}

export type FormValues = {
  [key: string]: any;
}

export type FormErrors = {
  [key: string]: FormError;
}

export type FormError = {
  errorsOccured: boolean | null;
  validationResult: ValidationResult;
}

export type ValidationResult = {
  [key: string] : {
    errorContent: string;
    isError: boolean | null;
  }
}