import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  fetchPurchasesStart,
  fetchPurchasesSuccess,
  fetchPurchasesFailure,
} from '@/src/redux/blockSlice/purchasesSlice';
import { URL } from '@/config';

export const useFetchPurchases = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        dispatch(fetchPurchasesStart());
        const response = await axios.get(`${URL}/blocks/purchase`);
        dispatch(fetchPurchasesSuccess(response.data.purchases || []));
      } catch (err) {
        dispatch(fetchPurchasesFailure(err.response?.data?.message || 'Failed to fetch purchases.'));
      }
    };

    fetchPurchases();
  }, [dispatch]);
};
