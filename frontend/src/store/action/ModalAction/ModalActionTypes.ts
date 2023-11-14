//types
export const TOGGLE_MODAL = "TOGGLE_MODAL";

//interface
export interface IModalAction {
  currentId?: number | null;
  modalId?: string | null;
}

export interface ModalOpen {
  type: typeof TOGGLE_MODAL;
  payload: IModalAction
}

export type ModalDispatchTypes = ModalOpen