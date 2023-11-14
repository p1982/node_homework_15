import NewspostsRepository from '../dal/newsposts/newsposts.repository.ts';
export interface Params {
  size: number | null;
  page: number | null;
  filter: any;
}

export interface IErrors {
  statusCode: number;
  message: string;
}


export interface INews {
  id?: string;
  title: string;
  text: string;
  genre: 'Politic' | 'Business' | 'Sport' | 'Other';
  isPrivate: boolean; // ony true or false
  author: string;
}

export interface FieldSchema {
  type: 'string' | 'number' | 'boolean';
  required?: boolean;
}

export interface ISchema {
  [key: string]: FieldSchema;
}

export interface ITable {
  getAll(): any;
  getById(id: string): any;
  create(data: any): any;
  update(id: string, data: any): any;
  delete(id: string): any;
}

export interface IRegisterSchema {
  registerSchema(tablesname: string, schema: ISchema): void;
  getTable(schemaName: string): NewspostsRepository;
}
