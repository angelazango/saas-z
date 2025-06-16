import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  catalog: [],
  loading: false,
  error: null,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    fetchCatalogStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCatalogSuccess: (state, action) => {
      state.loading = false;
      state.catalog = action.payload;
      state.error = null;
    },
    fetchCatalogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
      state.catalog.push(action.payload);
      state.error = null;
    },
    addProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      const index = state.catalog.findIndex(
        product => product.product_id === action.payload.product_id
      );
      if (index !== -1) {
        state.catalog[index] = action.payload;
      }
      state.error = null;
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.catalog = state.catalog.filter(
        product => product.product_id !== action.payload
      );
      state.error = null;
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCatalogStart,
  fetchCatalogSuccess,
  fetchCatalogFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} = catalogSlice.actions;

export default catalogSlice.reducer;