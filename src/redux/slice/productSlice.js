import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],            // List of all products
  currentProduct: null,    // Single selected product
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Create Product
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

    // Fetch All Products
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

    // Fetch Single Product
    fetchProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      state.loading = false;
      state.currentProduct = action.payload;
      state.error = null;
    },
    fetchProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Product
    updateProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.currentProduct = action.payload;
      state.error = null;
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Product
    deleteProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.products = state.products.filter(p => p.id !== action.payload);
      if (state.currentProduct?.id === action.payload) {
        state.currentProduct = null;
      }
      state.error = null;
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear current product
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
});

export const {
  createProductStart,
  createProductSuccess,
  createProductFailure,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  clearError,
  clearCurrentProduct,
} = productSlice.actions;

export default productSlice.reducer;
