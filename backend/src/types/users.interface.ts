export interface IUser {
  id?: number;
  email: string;
  password?: string;
}

export interface RequestUser {
  id: number;
  email: string;
}
