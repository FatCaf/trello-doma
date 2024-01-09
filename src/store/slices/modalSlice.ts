/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IModal {
  modals: {
    modalName: string | null;
  }[];
}

const initialState: IModal = {
  modals: [],
};

interface OpenModalAction extends PayloadAction<{ modalName: string | null }> {}

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: OpenModalAction) => {
      const name = action.payload.modalName;
      if (state.modals.length > 0) state.modals = [];

      state.modals.push({ modalName: name });
    },
    closeModal: (state) => {
      state.modals = [];
    },
  },
});

export const { openModal, closeModal } = ModalSlice.actions;
export default ModalSlice.reducer;
