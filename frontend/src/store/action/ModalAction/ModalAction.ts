import {
    ModalDispatchTypes,
    TOGGLE_MODAL,
    IModalAction,
  } from "./ModalActionTypes";
  
  // action 
  //open close all modal window in application depends id. 
  //in data - modalId and currentId - for deleting or editing one notes
  export const ToggleModal = (data: IModalAction): ModalDispatchTypes => ({
    type: TOGGLE_MODAL,
    payload: data,
  });