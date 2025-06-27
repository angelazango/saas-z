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
      // Create a new array reference to ensure React detects the change
      state.sessionMaterials = [...action.payload]; 
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
      // Create a new array instead of pushing to existing one
      state.sessionMaterials = [...state.sessionMaterials, action.payload];
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

// Export actions and reducer as before

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