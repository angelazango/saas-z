import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchPurchasesStart,
  fetchPurchasesSuccess,
  fetchPurchasesFailure,
  deletePurchaseStart,
  deletePurchaseSuccess,
  deletePurchaseFailure,
} from '@/src/redux/blockSlice/purchasesSlice';
import { URL } from '@/config';

export function usePurchases() {
  const dispatch = useDispatch();
  const { purchases, loading, error } = useSelector((state) => state.purchase);

  const fetchPurchases = async () => {
    try {
      dispatch(fetchPurchasesStart());
      const response = await axios.get(`${URL}/blocks/purchase`);
      dispatch(fetchPurchasesSuccess(response.data.purchases || []));
    } catch (err) {
      dispatch(fetchPurchasesFailure(err.response?.data?.message || 'Failed to fetch purchases.'));
    }
  };

  const deletePurchase = async (purchaseId) => {
    try {
      dispatch(deletePurchaseStart());
      await axios.delete(`${URL}/blocks/purchase/${purchaseId}`);
      dispatch(deletePurchaseSuccess(purchaseId));
    } catch (err) {
      dispatch(deletePurchaseFailure(err.response?.data?.message || 'Failed to delete purchase.'));
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return {
    purchases,
    loading,
    error,
    fetchPurchases,
    deletePurchase,
  };
}
