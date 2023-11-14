import {createStore, applyMiddleware} from "redux"
import rootReducer from "./reducers/rootReducer"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware, {ThunkDispatch, ThunkAction}  from "redux-thunk"
import { useDispatch, useSelector } from "react-redux"
import {NewspostsDispatchTypes} from './action/newsposts/newspostsActionTypes'
import { UserDispatchTypes } from "./action/session/sessionActionTypes"

//create Store
const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware )))

//type Dispatch
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export type RootStore = ReturnType<typeof rootReducer>

type AllActions = NewspostsDispatchTypes | UserDispatchTypes
export type TypedThunkAction<R = void> = ThunkAction<R, RootState, unknown, AllActions>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypedDispatch = ThunkDispatch<any, any, AllActions>;
export const useTypedSelector = <T>(selector: (s: RootState) => T): T => useSelector(selector);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useTypedDispatch = () => useDispatch<TypedDispatch>();

export default Store