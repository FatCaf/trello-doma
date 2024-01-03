/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { BoardPreviewTile } from '../../models/models';
import instance from '../../api/requests';

interface HomeSlice {
  boards: BoardPreviewTile[];
  status: string;
  error: unknown;
}

const initialState: HomeSlice = {
  boards: [],
  status: '',
  error: '',
};

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  try {
    const response: { boards: BoardPreviewTile[] } = await instance.get(`/board`);
    return response.boards;
  } catch (e: unknown) {
    const error = e as AxiosError;
    throw new Error(error.message);
  }
});

export const addBoard = createAsyncThunk('boards/addBoard', async (data: BoardPreviewTile) => {
  try {
    await instance.post('/board', data);
  } catch (e: unknown) {
    const error = e as AxiosError;
    throw new Error(error.message);
  }
});

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (boardId: string | null) => {
  try {
    await instance.delete(`/board/${boardId}`);
  } catch (e: unknown) {
    const error = e as AxiosError;
    throw new Error(error.message);
  }
});

const homeSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.status = 'loading';
      state.error = '';
    });
    builder.addCase(fetchBoards.fulfilled, (state, action: PayloadAction<BoardPreviewTile[]>) => {
      state.status = 'resolved';
      state.boards = action.payload;
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(addBoard.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(addBoard.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(deleteBoard.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(deleteBoard.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default homeSlice.reducer;
