import {
    ModalDispatchTypes,
    TOGGLE_MODAL,
  } from "../action/ModalAction/ModalActionTypes";
  import { IModalAction } from "../action/ModalAction/ModalActionTypes";
  
  //interfaces
  interface IInitialState {
    isOpen: boolean;
    data: IModalAction;
  }
  
  //initial state
  const initialState: IInitialState = {
    isOpen: false,
    data: {},
  };
  
  //modal reducer
  const ModalReducer = (
    state: IInitialState = initialState,
    { type, payload }: ModalDispatchTypes
  ): IInitialState => {
    switch (type) {
      case TOGGLE_MODAL:
        return { ...state, data: payload, isOpen: !state.isOpen };
      default:
        return state;
    }
  };
  export default ModalReducer;