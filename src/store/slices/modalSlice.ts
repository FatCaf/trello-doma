/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface IModal {
  isOpen: boolean;
}

const initialState: IModal = {
  isOpen: false,
};

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = ModalSlice.actions;
export default ModalSlice.reducer;
