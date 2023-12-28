/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import bodyColorReducer from './slices/bodyColorSlice';

export const store = configureStore({
  reducer: {
    bodyColor: bodyColorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
