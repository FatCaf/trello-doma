/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMovingElement, ISlot } from '../../models/models';

interface DnD {
  placeholder: ISlot;
  isDraggingStarted: boolean;
  element: IMovingElement;
  elementData: string;
  dragListId: number;
  dropListId: number;
}

const initialState: DnD = {
  placeholder: {
    width: 0,
    height: 0,
  },
  isDraggingStarted: false,
  element: {
    movingElement: null,
    clientX: 0,
    clientY: 0,
  },
  elementData: '',
  dragListId: 0,
  dropListId: 0,
};

const DnDSlice = createSlice({
  name: 'dnd',
  initialState,
  reducers: {
    dragStarted: (state, action) => {
      state.isDraggingStarted = true;
      state.element.movingElement = action.payload;
    },
    setDraggingData: (state, action: PayloadAction<string>) => {
      state.elementData = action.payload;
    },
    setPlaceholder: (state, action) => {
      const { width, height } = action.payload;
      state.placeholder.width = width;
      state.placeholder.height = height;
    },
    updateCoordinates: (state, action) => {
      const { clientX, clientY } = action.payload;
      state.element.clientX = clientX;
      state.element.clientY = clientY;
    },

    dragEnded: (state) => {
      state.isDraggingStarted = false;
      state.element.movingElement = null;
    },
    setDragListId: (state, action) => {
      state.dragListId = action.payload;
    },
    setDropListId: (state, action) => {
      state.dropListId = action.payload;
    },
  },
});

export const {
  dragStarted,
  setDraggingData,
  setPlaceholder,
  updateCoordinates,
  dragEnded,
  setDragListId,
  setDropListId,
} = DnDSlice.actions;
export default DnDSlice.reducer;
