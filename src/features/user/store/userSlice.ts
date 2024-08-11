import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user state
export interface UserState {
  // name: string | null;
  email: string | null;
  token: string | null;
}

// Define the initial state for the user
const initialState: UserState = {
  // name: null,
  email: null,
  token: null,
};

// Create the slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set user data
    setUser: (state, action: PayloadAction<{ token: string; email: string }>) => {
      state.token = action.payload.token;
      // state.name = action.payload.name;
      state.email = action.payload.email;
    },
    // Clear user data
    clearUser: (state) => {
      state.token = null;
      // state.name = null;
      state.email = null;
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
