// src/redux/slice/catalogSlice.js


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
    createCatalogItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createCatalogItemSuccess: (state, action) => {
      state.loading = false;
      state.catalog.push(action.payload);
      state.error = null;
    },
    createCatalogItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCatalogItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCatalogItemSuccess: (state, action) => {
      state.loading = false;
      state.catalog = state.catalog.filter(item => item.id !== action.payload);
      state.error = null;
    },
    deleteCatalogItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCatalogStart,
  fetchCatalogSuccess,
  fetchCatalogFailure,
  createCatalogItemStart,
  createCatalogItemSuccess,
  createCatalogItemFailure,
  deleteCatalogItemStart,
  deleteCatalogItemSuccess,
  deleteCatalogItemFailure,
} = catalogSlice.actions;

export default catalogSlice.reducer;