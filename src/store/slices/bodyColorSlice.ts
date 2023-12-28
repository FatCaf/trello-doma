/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface BodyColor {
  color: string;
}

const initialState: BodyColor = {
  color: 'rgb(205, 90, 145)',
};

export const bodyColorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setBodyColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
});

export const { setBodyColor } = bodyColorSlice.actions;

export const selectBodyColor = (state: RootState): string => state.bodyColor.color;
export default bodyColorSlice.reducer;
