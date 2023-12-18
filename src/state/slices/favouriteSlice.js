import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const favouritesSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    removeFromFavourites: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;