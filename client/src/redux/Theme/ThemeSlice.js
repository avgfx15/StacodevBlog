import { createSlice } from '@reduxjs/toolkit';

const initial_State = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initial_State,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const themeReducer = themeSlice.reducer;

export const { toggleTheme } = themeSlice.actions;
