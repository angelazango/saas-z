// src/redux/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// This is the initial state of our "logged-in" page in the Member Book.
// By default, no one is logged in, and we don't have their user info.
const initialState = {
  isLoggedIn: false, // Is someone currently logged in? (Starts as 'no')
  user: null,        // Who is logged in? (Starts as 'no one')
};

// We create a "slice" of our Member Book, specifically for "auth" (authentication).
export const authSlice = createSlice({
  name: 'auth', // This is like naming this page in the Member Book "Authentication"
  initialState, // We start with our default state (no one logged in)
  reducers: {
    // This is an action for when someone successfully "logs in".
    login: (state, action) => {
      state.isLoggedIn = true; // Mark them as logged in!
      state.user = action.payload; // Store their user information (like their name)
      // IMPORTANT: For this example, we're putting a token in localStorage here.
      // In a real app, this would be a secure token from a server.
      // We are using a dummy 'token' just to show the mechanism.
      localStorage.setItem('userToken', JSON.stringify(action.payload)); // Write "you're a member!" in their secret notebook
    },
    // This is an action for when someone "logs out".
    logout: (state) => {
      state.isLoggedIn = false; // Mark them as logged out!
      state.user = null;        // Clear their user information
      localStorage.removeItem('userToken'); // Erase the "you're a member!" note from their secret notebook
    },
    // This is an action to check if someone was already logged in when the app starts.
    // It looks at the secret notebook.
    checkLoginStatus: (state) => {
      // Try to get the user token from the secret notebook
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
      if (storedUser) {
        state.isLoggedIn = true; // If we found a note, they are logged in!
        state.user = JSON.parse(storedUser); // And remember who they are.
      } else {
        state.isLoggedIn = false; // No note, not logged in.
        state.user = null;
      }
    },
  },
});

// These are the "actions" we can "dispatch" to change the state (update the Member Book).
export const { login, logout, checkLoginStatus } = authSlice.actions;

// This is the "reducer" that tells Redux how to update the state when actions happen.
export default authSlice.reducer;