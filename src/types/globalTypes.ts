export interface IProduct {
  _id: number;
  Title: string;
  Author: string;
  Price: number;
  Genre: string;
  status: boolean;
  Publication_Date: Date;
  imageURL: string;
  Rating?: number;
  quantity?: number;
}
