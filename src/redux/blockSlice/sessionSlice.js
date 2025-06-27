import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessions: [],
  loading: false,
  error: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    fetchSessionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSessionsSuccess: (state, action) => {
      state.loading = false;
      state.sessions = action.payload;
      state.error = null;
    },
    fetchSessionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createSessionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createSessionSuccess: (state, action) => {
      state.loading = false;
      state.sessions.push(action.payload);
      state.error = null;
    },
    createSessionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSessionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSessionSuccess: (state, action) => {
      state.loading = false;
      state.sessions = state.sessions.filter(s => s.id !== action.payload);
      state.error = null;
    },
    deleteSessionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSessionStart: (state) => {
  state.loading = true;
  state.error = null;
},
updateSessionSuccess: (state, action) => {
  state.loading = false;
  state.sessions = state.sessions.map(session =>
    session.id === action.payload.id ? action.payload : session
  );
  state.error = null;
},
updateSessionFailure: (state, action) => {
  state.loading = false;
  state.error = action.payload;
},

  },
});

export const {
  fetchSessionsStart,
  fetchSessionsSuccess,
  fetchSessionsFailure,
  createSessionStart,
  createSessionSuccess,
  createSessionFailure,
  deleteSessionStart,
  deleteSessionSuccess,
  deleteSessionFailure,
   updateSessionStart,       // ✅ Add these
  updateSessionSuccess,     // ✅
  updateSessionFailure,
} = sessionSlice.actions;

export default sessionSlice.reducer;