
const initialState: any = {
  user: 'piotro'
};

const actionMap: any = {
  ['elo']: (state: any) =>
  ({
    ...state,
  }),
};

export const userReducer = (state = initialState, action: any) =>
  actionMap[action.type] ? actionMap[action.type](state, action) : state;
