import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sales: [],
  loading: false,
  error: null,
};

const saleSliceBlock = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    fetchSalesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSalesSuccess: (state, action) => {
      state.loading = false;
      state.sales = action.payload;
      state.error = null;
    },
    fetchSalesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createSaleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createSaleSuccess: (state, action) => {
      state.loading = false;
      state.sales.push(action.payload);
      state.error = null;
    },
    createSaleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSaleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSaleSuccess: (state, action) => {
      state.loading = false;
      state.sales = state.sales.filter(s => s.id !== action.payload);
      state.error = null;
    },
    deleteSaleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSaleStart: (state) => {
  state.loading = true;
  state.error = null;
},
updateSaleSuccess: (state, action) => {
  state.loading = false;
  const index = state.sales.findIndex(s => s.id === action.payload.id);
  if (index !== -1) {
    state.sales[index] = action.payload;
  }
  state.error = null;
},
updateSaleFailure: (state, action) => {
  state.loading = false;
  state.error = action.payload;
},

  },
});

export const {
  fetchSalesStart,
  fetchSalesSuccess,
  fetchSalesFailure,
  createSaleStart,
  createSaleSuccess,
  createSaleFailure,
  deleteSaleStart,
  deleteSaleSuccess,
  deleteSaleFailure,
  updateSaleStart,
  updateSaleSuccess,
  updateSaleFailure,
} = saleSliceBlock.actions;

export default saleSliceBlock.reducer;
