import { AuthState } from './reducer';

export const getIsCreatingAccount = ({isCreatingAccount}: AuthState) => isCreatingAccount;

export const getIsInAuthProcess = ({isInAuthProcess}: AuthState) => isInAuthProcess;

export const getLoggedUser = ({loggedUser}: AuthState) => loggedUser;