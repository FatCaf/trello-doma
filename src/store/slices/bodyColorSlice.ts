/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../store';
import instance from '../../api/requests';
import { IColorEdit } from '../../models/models';

interface BodyColor {
  color: Record<string, string>;
  status: string;
  error: unknown;
}

const initialState: BodyColor = {
  color: {},
  status: '',
  error: '',
};

export const editColor = createAsyncThunk('color/editColor', async (editData: IColorEdit) => {
  const { boardId, data } = editData;
  try {
    await instance.put(`board/${boardId}`, data);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

const bodyColorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setBodyColor: (state, action: PayloadAction<{ key: string; color: string }>) => {
      const { key, color } = action.payload;
      state.color = { ...state.color, [key]: color };
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

export const selectBodyColor = (state: RootState): Record<string, string> => state.bodyColor.color;
export default bodyColorSlice.reducer;
