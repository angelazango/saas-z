import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  materials: [],
  loading: false,
  error: null,
};

const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    fetchMaterialsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMaterialsSuccess: (state, action) => {
      state.loading = false;
      state.materials = action.payload;
      state.error = null;
    },
    fetchMaterialsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createMaterialStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createMaterialSuccess: (state, action) => {
      state.loading = false;
      state.materials.push(action.payload);
      state.error = null;
    },
    createMaterialFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateMaterialStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateMaterialSuccess: (state, action) => {
      state.loading = false;
      const index = state.materials.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.materials[index] = action.payload;
      }
      state.error = null;
    },
    updateMaterialFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMaterialStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteMaterialSuccess: (state, action) => {
      state.loading = false;
      state.materials = state.materials.filter(m => m.id !== action.payload);
      state.error = null;
    },
    deleteMaterialFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMaterialsStart,
  fetchMaterialsSuccess,
  fetchMaterialsFailure,
  createMaterialStart,
  createMaterialSuccess,
  createMaterialFailure,
  updateMaterialStart,
  updateMaterialSuccess,
  updateMaterialFailure,
  deleteMaterialStart,
  deleteMaterialSuccess,
  deleteMaterialFailure,
} = materialSlice.actions;

export default materialSlice.reducer; 