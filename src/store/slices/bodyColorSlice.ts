/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../store';
import instance from '../../api/requests';
import { IColorEdit } from '../../models/models';

interface BodyColor {
  color: string;
  status: string;
  error: unknown;
}

const initialState: BodyColor = {
  color: 'rgb(205, 90, 145)',
  status: '',
  error: '',
};

export const editColor = createAsyncThunk('color/editColor', async (editData: IColorEdit) => {
  const { boardId, data } = editData;
  try {
    await instance.put(`board/${boardId.boardId}`, data);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

const bodyColorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setBodyColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editColor.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(editColor.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { setBodyColor } = bodyColorSlice.actions;

export const selectBodyColor = (state: RootState): string => state.bodyColor.color;
export default bodyColorSlice.reducer;
