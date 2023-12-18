import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from '../slices/favouriteSlice';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
});