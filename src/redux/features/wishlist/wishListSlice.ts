import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IWishList {
  products: IProduct[];
  total: number;
}

const initialState: IWishList = {
  products: [],
  total: 0,
};

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existing) {
        existing.quantity = existing.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      // console.log(action.payload.Price);
      state.total += action.payload.Price;
      // console.log(state.total);
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existing && existing.quantity! > 1) {
        existing.quantity = existing.quantity! - 1;
      } else {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      }

      state.total -= action.payload.Price;
    },
    removeFromWishList: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );

      state.total -= action.payload.Price * action.payload.quantity!;
    },
  },
});

export const { addToWishList, removeFromWishList, removeOne } =
  wishListSlice.actions;

export default wishListSlice.reducer;
