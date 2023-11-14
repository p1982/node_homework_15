//types
export const USER_FAIL = "USER_FAIL";
export const USER_SUCCESS = "USER_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const USER_LOG_OUT = "USER_LOG_OUT"

//interfaces
export type UserType = {
  id: string;
  email: string;
  createDate: Date;
  token: string;
};

export type IUserType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export interface ErrorUserType {
  error: string;
}

export interface UserFail {
  type: typeof USER_FAIL;
  //payload: ErrorUserType;
}

export interface UserSuccess {
  type: typeof USER_SUCCESS;
  payload: UserType;
}

export interface UserLogOut {
  type: typeof USER_LOG_OUT;
}

//All types actions
export type UserDispatchTypes = UserFail | UserSuccess | UserLogOut;
