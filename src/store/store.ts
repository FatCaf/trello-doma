/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './slices/homeSlice';
import boardReducer from './slices/boardSlice';
import cardReducer from './slices/cardSlice';
import cardModalReducer from './slices/cardModalSlice';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    board: boardReducer,
    card: cardReducer,
    cardModal: cardModalReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
