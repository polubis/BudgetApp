type ValidatorsMap = {
  [key: string]: (value: any, valueToCompare?: any) => boolean;
}

type ValidatorsMessages = {
  [key: string]: (title: string, valueToCompare?: any) => string;
}

const validatorsMap: ValidatorsMap = {
  required: (value: any) => (value === undefined || value === null || value === ''),
  minLength: (value: string, valueToCompare: number) => value.length <= valueToCompare,
  maxLength: (value: string, valueToCompare: number) => value.length >= valueToCompare
}

const validatorsMessages: ValidatorsMessages = {
  required: (title: string) => `Field ${title} is required`,

  minLength: (title: string, valueToCompare: number) => 
    `Field ${title} must have more than ${valueToCompare} characters`,

  maxLength: (title: string, valueToCompare: number) => 
    `Field ${title} must have less than ${valueToCompare} characters`
}

export const resolveValidation = (key: string, value: any, title: string, valueToCompare?: any): {isError: boolean | null, errorContent: string} => {
  return {
    isError: validatorsMap[key](value, valueToCompare),
    errorContent: validatorsMessages[key](title, valueToCompare)
  }
}
