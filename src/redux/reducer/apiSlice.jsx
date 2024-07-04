// src/store/apiSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    baseUrl: 'http://localhost:8080/api/', // ערך התחלתי
  },
  reducers: {
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload;
    },
  },
});

export const { setBaseUrl } = apiSlice.actions;
export const selectBaseUrl = (state) => state.api.baseUrl;
export default apiSlice.reducer;
