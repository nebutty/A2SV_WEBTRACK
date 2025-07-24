// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import opportunitiesReducer from './opportunitiesSlice';

export const store = configureStore({
  reducer: {
    opportunities: opportunitiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
