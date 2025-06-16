import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  purchases: [],
  loading: false,
  error: null,
};

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    fetchPurchasesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPurchasesSuccess: (state, action) => {
      state.loading = false;
      state.purchases = action.payload;
      state.error = null;
    },
    fetchPurchasesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPurchaseStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createPurchaseSuccess: (state, action) => {
      state.loading = false;
      state.purchases.push(action.payload);
      state.error = null;
    },
    createPurchaseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPurchasesStart,
  fetchPurchasesSuccess,
  fetchPurchasesFailure,
  createPurchaseStart,
  createPurchaseSuccess,
  createPurchaseFailure,
} = purchaseSlice.actions;

export default purchaseSlice.reducer;