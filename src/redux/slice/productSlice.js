// src/redux/slice/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Product actions
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
      state.error = null;
    },
    createProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Category actions
    fetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = productSlice.actions;

export default productSlice.reducer;
