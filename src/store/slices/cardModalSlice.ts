/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import { BoardPreviewTile, IBoard } from '../../models/models';
import instance from '../../api/requests';

interface CardModalSlice {
  status: string;
  error: unknown;
  allBoards: {
    [key: string]: IBoard;
  };
}

const initialState: CardModalSlice = {
  allBoards: {},
  status: '',
  error: '',
};

export const fetchBoardsSequentially = createAsyncThunk(
  'cardModal/fetchBoardsSequentially',
  async (boards: BoardPreviewTile[]) => {
    try {
      const fetchedBoards: { [key: string]: IBoard } = {};

      // eslint-disable-next-line no-restricted-syntax
      for (const item of boards) {
        // eslint-disable-next-line no-await-in-loop
        const response: IBoard = await instance.get(`/board/${item.id}`);
        fetchedBoards[item.id] = response;
      }

      return fetchedBoards;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.message);
    }
  }
);

const cardModalSlice = createSlice({
  name: 'cardModal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoardsSequentially.fulfilled, (state, action) => {
      state.allBoards = action.payload;
    });
  },
});

export default cardModalSlice.reducer;
