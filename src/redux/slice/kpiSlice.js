import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  kpis: [],
};

const kpiSlice = createSlice({
  name: 'kpi',
  initialState,
  reducers: {
    setKpis: (state, action) => {
      state.kpis = action.payload;
    },
  },
});

export const { setKpis } = kpiSlice.actions;
export default kpiSlice.reducer;
