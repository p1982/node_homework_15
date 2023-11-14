import { Dispatch } from "redux";
import {
  USER_FAIL,
  USER_SUCCESS,
  USER_LOG_OUT,
  UserType,
  UserDispatchTypes,
  ErrorUserType,
  IUserType,
} from "./sessionActionTypes";
import axios from "axios";
import { TypedThunkAction } from "../../Store";

export const logIn =
  (url: string, user: IUserType): TypedThunkAction =>
  async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      //   dispatch({
      //     type: NEWSPOSTS_LOADING,
      //   });
      const res = await axios.post(url, user);
       
      dispatch({
        type: USER_SUCCESS,
        payload: res.data,
      });
      return res.data
    } catch (e) {
      dispatch({
        type: USER_FAIL,
        //payload: e,
      });
    }
  };

export const signUp =
  (url: string, user: IUserType): TypedThunkAction =>
  async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      //   dispatch({
      //     type: NEWSPOSTS_LOADING,
      //   });
      const res = await axios.post(url, user);

      dispatch({
        type: USER_SUCCESS,
        payload: res.data,
      });
      return res.data
    } catch (e) {
      dispatch({
        type: USER_FAIL,
        //payload: e,
      });
    }
  };

  export const logOut =
  (url: string): TypedThunkAction =>
  async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      const res = await axios.get(url);
      dispatch({
        type: USER_LOG_OUT,
      });
    } catch (e) {
      dispatch({
        type: USER_FAIL,
        //payload: e,
      });
    }
  };
