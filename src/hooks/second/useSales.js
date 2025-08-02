// src/hooks/useFetchSalesRealtime.js
'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  fetchSalesStart,
  fetchSalesSuccess,
  fetchSalesFailure,
} from '@/src/redux/slice/saleSlice';
import { URL } from '@/config';

export const useFetchSalesRealtime = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        dispatch(fetchSalesStart());
        const res = await axios.get(`${URL}/sale`);
        dispatch(fetchSalesSuccess(res.data.sales || []));
      } catch (err) {
        dispatch(fetchSalesFailure(err.message || 'Failed to fetch sales'));
      }
    };

    fetchSales();
    const interval = setInterval(fetchSales, 5000); // 🔁 refresh every 5s

    return () => clearInterval(interval); // cleanup on unmount
  }, [dispatch]);
};
