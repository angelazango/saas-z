// import { fetchCategories, createCategory } from './categoryApi';


import {fetchCategories, createCategory} from '../../services/categoryApi';

import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
} from '../slice/categorySlice';




export const fetchCategoriesThunk = () => async (dispatch) => {
  try {
    dispatch(fetchCategoriesStart());
    const categories = await fetchCategories();
    dispatch(fetchCategoriesSuccess(categories));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};

export const createCategoryThunk = (categoryData) => async (dispatch) => {
  try {
    dispatch(createCategoryStart());
    const newCategory = await createCategory(categoryData);
    dispatch(createCategorySuccess(newCategory));
    return newCategory; // Return the created category for component use
  } catch (error) {
    dispatch(createCategoryFailure(error.message));
    throw error; // Re-throw for component error handling
  }
};

// Add other category thunks as needed