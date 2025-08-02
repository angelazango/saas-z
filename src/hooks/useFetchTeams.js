'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  fetchTeamsStart,
  fetchTeamsSuccess,
  fetchTeamsFailure,
} from '@/src/redux/blockSlice/teamSlice';
import { URL } from '@/config';

export const useFetchTeams = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        dispatch(fetchTeamsStart());
        const response = await axios.get(`${URL}/blocks/team`);
        dispatch(fetchTeamsSuccess(response.data.teams || []));
      } catch (err) {
        dispatch(fetchTeamsFailure(err.response?.data?.message || 'Failed to fetch teams'));
      }
    };

    fetchTeams();
  }, [dispatch]);
};
