import { combineReducers } from "redux";
import newspostsReducer from "./newspostsReducer";
import ModalReducer from "./modalReducer";
import sessionReducer from "./sessionReducer"

//combine reducers
const rootReducer = combineReducers({
    newsposts: newspostsReducer,
    modal: ModalReducer,
    session: sessionReducer
});

export default rootReducer;