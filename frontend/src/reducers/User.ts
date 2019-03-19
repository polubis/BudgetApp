import { User } from '../models/User';

type State = {
  loggedUserData: User | null
}

const initialState: State = {
  loggedUserData: null
};

const actionMap: any = {
  ['elo']: (state: any) =>
  ({
    ...state,
  }),
};

export const userReducer = (state = initialState, action: any) =>
  actionMap[action.type] ? actionMap[action.type](state, action) : state;
