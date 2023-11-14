import {
  USER_FAIL,
  USER_SUCCESS,
  USER_LOG_OUT,
  UserType,
  UserDispatchTypes,
  ErrorUserType,
} from "../action/session/sessionActionTypes";

interface IInitialState {
  loading?: boolean;
  user:  UserType  | null;
  error: { [key: string]: ErrorUserType } | null;
}

//initial state
const initialState: IInitialState = {
  loading: true,
  user: null,
  error: null,
};

//note reducer
const sessionReducer = (state = initialState, action: UserDispatchTypes): typeof initialState => {
  switch (action.type) {
    // case USER_FAIL:
    //   return { ...state, error: action.payload };
    case USER_SUCCESS:          
      return { ...state, user: action.payload };
    case USER_LOG_OUT:
      return { ...state, user: null}
    default:
      return state;
  }
};

export default sessionReducer;
