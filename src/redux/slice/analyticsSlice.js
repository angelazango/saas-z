import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productionData: [
    { date: '2024-01-10', bricks: 2200, target: 2500 },
    { date: '2024-01-11', bricks: 2400, target: 2500 },
    { date: '2024-01-12', bricks: 2100, target: 2500 },
    { date: '2024-01-13', bricks: 2600, target: 2500 },
    { date: '2024-01-14', bricks: 2300, target: 2500 },
    { date: '2024-01-15', bricks: 2500, target: 2500 },
  ],
  salesData: [
    { month: 'Jan', sales: 12000, revenue: 9600 },
    { month: 'Feb', sales: 15000, revenue: 12000 },
    { month: 'Mar', sales: 11000, revenue: 8800 },
    { month: 'Apr', sales: 18000, revenue: 14400 },
  ],
  kpis: {
    totalProduction: 15100,
    totalSales: 3000,
    totalRevenue: 2300,
    efficiency: 92,
    qualityRate: 98,
    activeTeams: 2,
  },
  realTimeData: {
    currentProduction: 145,
    targetProduction: 200,
    activeWorkers: 8,
    machineStatus: 'operational',
  },
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateRealTimeData: (state, action) => {
      state.realTimeData = { ...state.realTimeData, ...action.payload };
    },
    addProductionData: (state, action) => {
      state.productionData.push(action.payload);
    },
    updateKPIs: (state, action) => {
      state.kpis = { ...state.kpis, ...action.payload };
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  updateRealTimeData,
  addProductionData,
  updateKPIs,
  setError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;