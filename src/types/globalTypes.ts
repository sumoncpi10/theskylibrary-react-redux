export interface IProduct {
  _id: number;
  Title: string;
  Author: string;
  Price: number;
  Genre: string;
  status: boolean;
  Publication_Date?: string;
  imageURL: string;
  Rating?: number;
  quantity?: number;
  addBy?: string | null;
}
