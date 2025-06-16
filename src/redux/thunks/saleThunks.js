// thunks/saleThunks.js
import axios from 'axios';
import { URL } from '@/config';
import {
  postSaleStart,
  postSaleSuccess,
  postSaleFailure,
  fetchSalesStart,
  fetchSalesSuccess,
  fetchSalesFailure
} from '../slice/saleSlice';

export const postSale = (saleData) => async (dispatch) => {
  try {
    dispatch(postSaleStart());
    const response = await axios.post(`${URL}/sales`, saleData);
    dispatch(postSaleSuccess(response.data));
    return response.data; // Return the created sale for component use
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to post sale';
    dispatch(postSaleFailure(errorMessage));
    throw errorMessage; // Re-throw for component error handling
  }
};

export const fetchSales = () => async (dispatch) => {
  try {
    dispatch(fetchSalesStart());
    const response = await axios.get(`${URL}/sales`);
    dispatch(fetchSalesSuccess(response.data));
    return response.data; // Return sales data for component use
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch sales';
    dispatch(fetchSalesFailure(errorMessage));
    throw errorMessage; // Re-throw for component error handling
  }
};