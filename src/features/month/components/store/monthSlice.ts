import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user state
export interface MonthState {
  date: string | null;
}

// Define the initial state for the user
const initialState: MonthState = {
  date: null,
};

// Create the slice
export const monthSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    // Set user data
    setDate: (state, action: PayloadAction<{ date: string }>) => {
      state.date = action.payload.date;
    },
    // Clear user data
  },
});

// Export actions
export const { setDate } = monthSlice.actions;

// Export the reducer
export default monthSlice.reducer;
