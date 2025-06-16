// slice/saleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sales: [],       // Array to store sales data
  loading: false,  // For loading state
  error: null,     // For error tracking
  success: false,  // For success tracking
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    // Post sale actions
    postSaleStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    postSaleSuccess: (state, action) => {
      state.loading = false;
      state.sales.unshift(action.payload); // Add new sale to beginning
      state.success = true;
    },
    postSaleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    // Fetch sales actions
    fetchSalesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSalesSuccess: (state, action) => {
      state.loading = false;
      state.sales = action.payload;
    },
    fetchSalesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Reset state
    resetSalesState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
});

export const {
  postSaleStart,
  postSaleSuccess,
  postSaleFailure,
  fetchSalesStart,
  fetchSalesSuccess,
  fetchSalesFailure,
  resetSalesState
} = salesSlice.actions;

export default salesSlice.reducer;