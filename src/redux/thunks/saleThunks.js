import axios from 'axios';
import { URL } from '@/config';
import {
  createSaleStart,
  createSaleSuccess,
  createSaleFailure,
  fetchSalesStart,
  fetchSalesSuccess,
  fetchSalesFailure,
} from '../slice/saleSlice';

export const postSale = (saleData) => async (dispatch) => {
  try {
    dispatch(createSaleStart());
    const response = await axios.post(`${URL}/sale`, saleData);
    dispatch(createSaleSuccess(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to post sale';
    dispatch(createSaleFailure(errorMessage));
    throw errorMessage;
  }
};

export const fetchSales = () => async (dispatch) => {
  try {
    dispatch(fetchSalesStart());
    const response = await axios.get(`${URL}/sale`);
    dispatch(fetchSalesSuccess(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch sales';
    dispatch(fetchSalesFailure(errorMessage));
    throw errorMessage;
  }
};
