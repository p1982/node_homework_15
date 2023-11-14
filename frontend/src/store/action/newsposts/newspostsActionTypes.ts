//types
export const NEWSPOSTS_LOADING = "NEWSPOSTS_LOADING";
export const NEWSPOSTS_FAIL = "NEWSPOSTS_FAIL";
export const NEWSPOSTS_SUCCESS = "NEWSPOSTS_SUCCESS";
export const NEWSPOST_CREATED = "NEWSPOST_CREATED";
export const NEWSPOST_DELETE_ONE = "NEWSPOST_DELETE_ONE";
export const NEWSPOST_EDIT = "NEWSPOST_EDIT";
export const NEWSPOST_SUCCESS = "NEWSPOST_SUCCESS";
export const COUNT_OF_PAGES = "COUNT_OF_PAGES";

//interfaces
export type NewspostType = {
  id: string;
  title: string;
  text: string;
  genre: 'Politic' | 'Business' | 'Sport' | 'Other';
  isPrivate: Boolean,
  createDate: Date,
};

export type INewsNewspostType = {
  title: string;
  text: string;
  genre: 'Politic' | 'Business' | 'Sport' | 'Other';
  isPrivate: Boolean,
};

export interface NewsPostsLoading {
  type: typeof NEWSPOSTS_LOADING;
}

export interface NewspostsFail {
  type: typeof NEWSPOSTS_FAIL;
}

export interface NewspostsSuccess {
  type: typeof NEWSPOSTS_SUCCESS;
  payload: Array<NewspostType>;
}

export interface NewspostCreate {
  type: typeof NEWSPOST_CREATED;
  payload: NewspostType;
}

export interface NewspostDeleteOne {
  type: typeof NEWSPOST_DELETE_ONE;
  payload: string;
}

export interface NewspostEdit {
  type: typeof NEWSPOST_EDIT;
  payload: NewspostType;
}

export interface NewspostOneSuccess {
  type: typeof NEWSPOST_SUCCESS;
  payload: NewspostType;
}

export interface CountOfPage {
  type: typeof COUNT_OF_PAGES
  payload: number | null;
}

//All types actions
export type NewspostsDispatchTypes =
  | NewsPostsLoading
  | NewspostsFail
  | NewspostsSuccess
  | NewspostCreate
  | NewspostDeleteOne
  | NewspostEdit
  | NewspostOneSuccess
  | CountOfPage;
