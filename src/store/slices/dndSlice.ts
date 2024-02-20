/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface DndSlice {
  movingElement: HTMLDivElement | null;
  placeholder: {
    width: number;
    height: number;
    borderRadius: string;
    backgroundColor: string;
  };
}

const initialState: DndSlice = {
  movingElement: null,
  placeholder: {
    width: 0,
    height: 0,
    borderRadius: '6px',
    backgroundColor: 'gray',
  },
};

const dndSlice = createSlice({
  name: 'dnd',
  initialState,
  reducers: {
    dragStart: (state, action) => {
      state.movingElement = action.payload;
    },
    setSlotStyle: (state, action) => {
      state.placeholder = action.payload;
    },
  },
});

export const { dragStart, setSlotStyle } = dndSlice.actions;

export default dndSlice.reducer;
