import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teams: [],
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    fetchTeamsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTeamsSuccess: (state, action) => {
      state.loading = false;
      state.teams = action.payload;
      state.error = null;
    },
    fetchTeamsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTeamStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTeamSuccess: (state, action) => {
      state.loading = false;
      state.teams.push(action.payload);
      state.error = null;
    },
    createTeamFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTeamStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTeamSuccess: (state, action) => {
      state.loading = false;
      state.teams = state.teams.map(team =>
        team.id === action.payload.id ? action.payload : team
      );
      state.error = null;
    },
    updateTeamFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTeamStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTeamSuccess: (state, action) => {
      state.loading = false;
      state.teams = state.teams.filter(t => t.id !== action.payload);
      state.error = null;
    },
    deleteTeamFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTeamsStart,
  fetchTeamsSuccess,
  fetchTeamsFailure,
  createTeamStart,
  createTeamSuccess,
  createTeamFailure,
  updateTeamStart,
  updateTeamSuccess,
  updateTeamFailure,
  deleteTeamStart,
  deleteTeamSuccess,
  deleteTeamFailure,
} = teamSlice.actions;

export default teamSlice.reducer;