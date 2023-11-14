import { Dispatch } from "redux";
import {
  NewspostsDispatchTypes,
  INewsNewspostType,
  NEWSPOSTS_LOADING,
  NEWSPOSTS_FAIL,
  NEWSPOSTS_SUCCESS,
  NEWSPOST_CREATED,
  NEWSPOST_DELETE_ONE,
  NEWSPOST_EDIT,
  NEWSPOST_SUCCESS,
  COUNT_OF_PAGES,
} from "./newspostsActionTypes";
import axios from "axios";
import { TypedThunkAction } from "../../Store";

export const getNewsPosts =
  (url: string):TypedThunkAction => async (dispatch) => {
    try {
      dispatch({
        type: NEWSPOSTS_LOADING,
      });
      const res = await axios.get(url);

        
      const page = await Math.ceil(res.data.total / res.data.size)
      dispatch({
        type: NEWSPOSTS_SUCCESS,
        payload: res.data.newsposts,
      });
      dispatch({
        type: COUNT_OF_PAGES,
        payload: page,
      });
    } catch (e) {
      dispatch({
        type: NEWSPOSTS_FAIL,
      });
    }
  };

export const deleteNewsPost =
  (url: string, id:string) => async (dispatch: Dispatch<NewspostsDispatchTypes>) => {
    try {
      const res = await axios.delete(`${url}${id}`);
      if(!res){
        throw new Error(res)
      }
      dispatch({
        type: NEWSPOST_DELETE_ONE,
        payload: id,
      });
    } catch (e) {
      dispatch({
        type: NEWSPOSTS_FAIL,
      });
    }
  };

  export const getNewspostById =
  (url: string, id:string) => async (dispatch: Dispatch<NewspostsDispatchTypes>) => {
    try {
      const res = await axios.get(`${url}${id}`);

      dispatch({
        type: NEWSPOST_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: NEWSPOSTS_FAIL,
      });
    }
  };

  export const createNewspost =
  (url: string, post:INewsNewspostType) => async (dispatch: Dispatch<NewspostsDispatchTypes>) => {
    try {
      const res = await axios.post(`${url}`, post);

      dispatch({
        type: NEWSPOST_CREATED,
        payload: res.data,
      });      
      return res.data.id
    } catch (e) {      
      dispatch({
        type: NEWSPOSTS_FAIL,
      });
    }
  };

  export const updateANewspost =
  (url: string, post:INewsNewspostType, id: string) => async (dispatch: Dispatch<NewspostsDispatchTypes>) => {
    try {
      const res = await axios.put(`${url}${id}`, post);
      dispatch({
        type: NEWSPOST_EDIT,
        payload: res.data,
      });

            
      return res.data.id
    } catch (e) {
      dispatch({
        type: NEWSPOSTS_FAIL,
      });
    }
  };
