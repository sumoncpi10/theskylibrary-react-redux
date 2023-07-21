import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
  status: boolean;
  genre: string;
  priceRange: number;
  yearRange: number;
  searchBooks: any[];
}

const initialState: IProduct = {
  status: false,
  genre: '',
  priceRange: 50,
  yearRange: 2024,
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
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setYearRange: (state, action: PayloadAction<number>) => {
      state.yearRange = action.payload;
    },
    setSearchBooks: (state, action: PayloadAction<any[]>) => {
      state.searchBooks = action.payload;
    },
  },
});

export const {
  toggleState,
  setGenre,
  setPriceRange,
  setYearRange,
  setSearchBooks,
} = productSlice.actions;

export default productSlice.reducer;
