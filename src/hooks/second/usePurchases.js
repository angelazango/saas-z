// src/hooks/useFetchPurchasesRealtime.js
'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  fetchPurchasesStart,
  fetchPurchasesSuccess,
  fetchPurchasesFailure,
} from '@/src/redux/slice/purchaseSlice';
import { URL } from '@/config';

export const useFetchPurchasesRealtime = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        dispatch(fetchPurchasesStart());
        const res = await axios.get(`${URL}/purchase`);
        dispatch(fetchPurchasesSuccess(res.data.purchases || []));
      } catch (err) {
        dispatch(fetchPurchasesFailure(err.message || 'Failed to fetch purchases'));
      }
    };

    fetchPurchases();
    const interval = setInterval(fetchPurchases, 5000); // ⏱ every 5 seconds
    return () => clearInterval(interval);
  }, [dispatch]);
};
