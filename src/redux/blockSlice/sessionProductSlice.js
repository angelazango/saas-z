import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionProducts: [],
  loading: false,
  error: null,
};

const sessionProductSlice = createSlice({
  name: 'sessionProduct',
  initialState,
  reducers: {
    fetchSessionProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSessionProductsSuccess: (state, action) => {
      state.loading = false;
      state.sessionProducts = action.payload;
      state.error = null;
    },
    fetchSessionProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createSessionProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createSessionProductSuccess: (state, action) => {
      state.loading = false;
      state.sessionProducts.push(action.payload);
      state.error = null;
    },
    createSessionProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSessionProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSessionProductSuccess: (state, action) => {
      state.loading = false;
      state.sessionProducts = state.sessionProducts.filter(
        sp => sp.id !== action.payload
      );
      state.error = null;
    },
    deleteSessionProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSessionProductsStart,
  fetchSessionProductsSuccess,
  fetchSessionProductsFailure,
  createSessionProductStart,
  createSessionProductSuccess,
  createSessionProductFailure,
  deleteSessionProductStart,
  deleteSessionProductSuccess,
  deleteSessionProductFailure,
} = sessionProductSlice.actions;

export default sessionProductSlice.reducer;