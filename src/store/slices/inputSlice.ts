import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */
interface InputState {
  inputs: {
    id: string;
    open: boolean;
    value?: string;
  }[];
}

const initialState: InputState = {
  inputs: [],
};

interface OpenInputAction extends PayloadAction<{ id: string }> {}

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    openInput: (state, action: OpenInputAction) => {
      const inputId = action.payload.id;
      if (state.inputs.length > 0) state.inputs = [];

      state.inputs.push({ id: inputId, open: true });
    },
    closeInput: (state) => {
      state.inputs = [];
    },
  },
});

export const { openInput, closeInput } = inputSlice.actions;
export default inputSlice.reducer;
