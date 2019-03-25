import { createContext } from 'react';

export type FormContext = {
  currentFocusedInput: string;
  changeFocusedInput: (key: string) => void;
  handleTyping: (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const { Provider, Consumer } = createContext({
  currentFocusedInput: '',
  changeFocusedInput: (key: string) => {},
  handleTyping: (key: string, e: React.ChangeEvent<HTMLInputElement>) => {}
});