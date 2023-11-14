export interface Newspost {
  title: string;
  text: string;
  genre: 'Politic' | 'Business' | 'Sport' | 'Other';
  isPrivate: Boolean,
}

export interface PagedNewsPosts {
  newsposts: Newspost[];
  total: number;
  size: number;
  page: number;
}

export enum REPORT_ENTITY {
  USER= "user",
  POST="post"
  }
