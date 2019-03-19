import { CREATE_ACCOUNT } from '../constants';

type State = {
  readonly isCreatingAccount: boolean;
}

const initialState: State = {
  isCreatingAccount: false,
};

const actionMap: any = {
  [CREATE_ACCOUNT]: (state: State) => 
  ({
    ...state,
    isCreatingAccount: true
  })
};

export const authReducer = (state = initialState, action: any) =>
  actionMap[action.type] ? actionMap[action.type](state, action) : state;
