import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionMaterials: [],
  loading: false,
  error: null,
};

const sessionMaterialSlice = createSlice({
  name: 'sessionMaterial',
  initialState,
  reducers: {
    fetchSessionMaterialsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSessionMaterialsSuccess: (state, action) => {
      state.loading = false;
      state.sessionMaterials = action.payload.map(item => ({
        ...item,
        date: item.date || new Date().toISOString().split('T')[0] // Ensure date exists
      }));
      state.error = null;
    },
    fetchSessionMaterialsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createSessionMaterialStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createSessionMaterialSuccess: (state, action) => {
      state.loading = false;
      state.sessionMaterials = [
        ...state.sessionMaterials, 
        {
          ...action.payload,
          date: action.payload.date || new Date().toISOString().split('T')[0]
        }
      ];
      state.error = null;
    },
    createSessionMaterialFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSessionMaterialStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSessionMaterialSuccess: (state, action) => {
      state.loading = false;
      state.sessionMaterials = state.sessionMaterials.filter(
        sm => sm.id !== action.payload
      );
      state.error = null;
    },
    deleteSessionMaterialFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSessionMaterialsStart,
  fetchSessionMaterialsSuccess,
  fetchSessionMaterialsFailure,
  createSessionMaterialStart,
  createSessionMaterialSuccess,
  createSessionMaterialFailure,
  deleteSessionMaterialStart,
  deleteSessionMaterialSuccess,
  deleteSessionMaterialFailure,
} = sessionMaterialSlice.actions;

export default sessionMaterialSlice.reducer;