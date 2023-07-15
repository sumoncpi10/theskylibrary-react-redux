import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
  status: boolean;
  priceRange: number;
  searchBooks: any[];
}

const initialState: IProduct = {
  status: false,
  priceRange: 150,
  searchBooks: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
    setSearchBooks: (state, action: PayloadAction<any[]>) => {
      state.searchBooks = action.payload;
    },
  },
});

export const { toggleState, setPriceRange, setSearchBooks } =
  productSlice.actions;

export default productSlice.reducer;
