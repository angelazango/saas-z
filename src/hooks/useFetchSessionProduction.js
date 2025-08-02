// hooks/useFetchSessionProduction.js

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  fetchSessionProductsStart,
  fetchSessionProductsSuccess,
  fetchSessionProductsFailure,
} from '@/src/redux/blockSlice/sessionProductSlice';
import { URL } from '@/config';

export const useFetchSessionProduction = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSessionProducts = async () => {
      try {
        dispatch(fetchSessionProductsStart());

        const response = await axios.get(`${URL}/blocks/session/product`);
        const sessionProducts = response?.data?.session_products || [];

        dispatch(fetchSessionProductsSuccess(sessionProducts));
      } catch (error) {
        console.error('Error fetching session products:', error);
        dispatch(
          fetchSessionProductsFailure(
            error.response?.data?.message || error.message || 'Fetch failed'
          )
        );
      }
    };

    fetchSessionProducts();
  }, [dispatch]);
};
