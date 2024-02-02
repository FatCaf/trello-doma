/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import bodyColorReducer from './slices/bodyColorSlice';
import boardsReducer from './slices/homeSlice';
import boardReducer from './slices/boardSlice';
import cardReducer from './slices/cardSlice';
import modalReducer from './slices/modalSlice';
import cardModalReducer from './slices/cardModalSlice';

export const store = configureStore({
  reducer: {
    bodyColor: bodyColorReducer,
    boards: boardsReducer,
    board: boardReducer,
    card: cardReducer,
    modal: modalReducer,
    cardModal: cardModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
