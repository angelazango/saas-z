import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
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
    createCategoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createCategorySuccess: (state, action) => {
      state.loading = false;
      state.categories.push(action.payload);
      state.error = null;
    },
    createCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCategoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCategorySuccess: (state, action) => {
      state.loading = false;
      const index = state.categories.findIndex(
        cat => cat.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
      state.error = null;
    },
    updateCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCategoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCategorySuccess: (state, action) => {
      state.loading = false;
      state.categories = state.categories.filter(
        cat => cat.id !== action.payload
      );
      state.error = null;
    },
    deleteCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;