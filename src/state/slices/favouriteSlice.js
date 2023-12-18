import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    removeFromFavourites: (state, action) => {
        console.log(action.payload);
      state.value = state.value.filter(obj => obj.idMeal !== action.payload.idMeal);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;