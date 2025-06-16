import { fetchProducts, createProduct } from '../../services/productApi';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
} from '../slice/productSlice';

export const fetchProductsThunk = () => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const products = await fetchProducts();
    dispatch(fetchProductsSuccess(products));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const createProductThunk = (productData) => async (dispatch) => {
  try {
    dispatch(createProductStart());
    const newProduct = await createProduct(productData);
    dispatch(createProductSuccess(newProduct));
    return newProduct; // Return the created product for component use
  } catch (error) {
    dispatch(createProductFailure(error.message));
    throw error; // Re-throw for component error handling
  }
};

// Add other product thunks as needed