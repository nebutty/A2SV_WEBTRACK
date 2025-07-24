// src/redux/opportunitiesSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://akil-backend.onrender.com/opportunities/search';

export const fetchOpportunities = createAsyncThunk(
  'opportunities/fetchAll',
  async () => {
    const response = await axios.get(API_URL);
    return response.data.data; 
  }
);

const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState: {
    data: [],
    loading: false,
    error: null,
  } as {
    data: any[];
    loading: boolean;
    error: string | null;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpportunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpportunities.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOpportunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch data';
      });
  },
});

export default opportunitiesSlice.reducer;
