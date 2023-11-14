import {
  NewspostType,
  NewspostsDispatchTypes,
  NEWSPOSTS_LOADING,
  NEWSPOSTS_FAIL,
  NEWSPOSTS_SUCCESS,
  NEWSPOST_CREATED,
  NEWSPOST_DELETE_ONE,
  NEWSPOST_EDIT,
  NEWSPOST_SUCCESS,
  COUNT_OF_PAGES,
} from "../action/newsposts/newspostsActionTypes";

interface IInitialState {
  loading?: boolean;
  newsposts?: { [key: string]: NewspostType };
  id?: string;
  newspost: NewspostType;
  page: number | null;
}

interface IAcc {
  [key: string]: NewspostType;
}

//initial state
const initialState: IInitialState = {
  loading: true,
  newsposts: {},
  newspost: { 
    id: "", 
    title: "", 
    text: "",  
    genre: 'Other',
    isPrivate: false,
    createDate: new Date(), 
  },
  page: null,
};

//note reducer
const newspostsReducer = (
  state: IInitialState = initialState,
  action: NewspostsDispatchTypes
) => {
  switch (action.type) {
    case NEWSPOSTS_SUCCESS:
      const result = action.payload.reduce((acc: IAcc, cur: NewspostType) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
      return { ...state, newsposts: result, loading: false };
    case NEWSPOST_DELETE_ONE:
      const deletedState = { ...state };

      if (action.payload) {
        const postIdToDelete = action.payload;
        if (
          deletedState.newsposts &&
          deletedState.newsposts.hasOwnProperty(postIdToDelete)
        ) {
          delete deletedState.newsposts[postIdToDelete];
        }
      }
      return deletedState;
    case NEWSPOST_SUCCESS:
      return { ...state, newspost: action.payload, loading: false };
    case NEWSPOST_CREATED:
      const newState = { ...state };
      if (newState.newsposts) {
        newState.newsposts[action.payload.id] = action.payload;
        return newState;
      }
      return newState;
    case NEWSPOST_EDIT:
      const updatedState = { ...state };
      if (updatedState.newsposts) {
        updatedState.newsposts[action.payload.id] = action.payload;
        return updatedState;
      }
      return updatedState;
    case COUNT_OF_PAGES:
      if(action.payload){
        return {...state, page: action.payload};
      }
      return {...state};
    default:
      return state;
  }
};

export default newspostsReducer;
