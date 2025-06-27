// src/redux/thunks/catalogThunks.js
import axios from 'axios';
import { URL } from '@/config';
import {
  fetchCatalogStart,
  fetchCatalogSuccess,
  fetchCatalogFailure,
  createCatalogItemStart,
  createCatalogItemSuccess,
  createCatalogItemFailure,
  deleteCatalogItemStart,
  deleteCatalogItemSuccess,
  deleteCatalogItemFailure,
} from '../slice/catalogSlice';

export const fetchCatalog = () => async (dispatch) => {
  try {
    dispatch(fetchCatalogStart());
    const response = await axios.get(`${URL}/catalog`);
    dispatch(fetchCatalogSuccess(response.data.catalog || []));
  } catch (err) {
    dispatch(fetchCatalogFailure(err.response?.data?.message || 'Failed to fetch catalog.'));
  }
};

export const createCatalogItem = (itemData) => async (dispatch) => {
  try {
    dispatch(createCatalogItemStart());
    const response = await axios.post(`${URL}/catalog`, itemData);
    dispatch(createCatalogItemSuccess(response.data));
    return { success: true };
  } catch (err) {
    dispatch(createCatalogItemFailure(err.response?.data?.message || 'Failed to create catalog item.'));
    return { success: false, error: err.response?.data?.message };
  }
};

export const deleteCatalogItem = (itemId) => async (dispatch) => {
  try {
    dispatch(deleteCatalogItemStart());
    await axios.delete(`${URL}/catalog/${itemId}`);
    dispatch(deleteCatalogItemSuccess(itemId));
    return { success: true };
  } catch (err) {
    dispatch(deleteCatalogItemFailure(err.response?.data?.message || 'Failed to delete catalog item.'));
    return { success: false, error: err.response?.data?.message };
  }
};