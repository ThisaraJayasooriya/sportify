import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      const exists = state.items.find(item => item.idEvent === action.payload.idEvent);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromFavourites: (state, action) => {
      state.items = state.items.filter(item => item.idEvent !== action.payload);
    },
    setFavourites: (state, action) => {
      state.items = action.payload;
    },
    clearFavourites: (state) => {
      state.items = [];
    },
  },
});

export const { addToFavourites, removeFromFavourites, setFavourites, clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
