import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  token: null,
  email :null
};

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// Export actions
export const { setToken, clearToken , setUser , clearUser } = authSlice.actions;

// Export reducer as default
export default authSlice.reducer;
