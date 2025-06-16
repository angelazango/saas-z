import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vendors: [],
  loading: false,
  error: null,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    fetchVendorsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchVendorsSuccess: (state, action) => {
      state.loading = false;
      state.vendors = action.payload;
      state.error = null;
    },
    fetchVendorsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createVendorStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createVendorSuccess: (state, action) => {
      state.loading = false;
      state.vendors.push(action.payload);
      state.error = null;
    },
    createVendorFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchVendorsStart,
  fetchVendorsSuccess,
  fetchVendorsFailure,
  createVendorStart,
  createVendorSuccess,
  createVendorFailure,
} = vendorSlice.actions;

export default vendorSlice.reducer;
