import { RoleUser } from "../config/constants";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  registerDate: string;
  role: RoleUser;
  state?: boolean;
  dailyQuote?: string | null;
  allQuotes?: boolean;
}
export interface IUserToken {
  id?: number;
  name: string;
  role: string;
}
export interface IQuotes {
  id?: number;
  quote: string;
  writer: string;
  role: RoleUser;
  idUser: number;
  registerDate: string;
}
export interface IViewQuotes {
  userId: number;
  quoteId: number;
}
