/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  IBoard,
  IColumn,
  IBoardEdit,
  IColumnDelete,
  IColumnEdit,
  IColumnPost,
  IColumnEditPos,
  ICardEditPos,
} from '../../models/models';
import instance from '../../api/requests';

interface BoardSlice {
  board: IBoard;
  status: string;
  error: unknown;
  isBoardLoaded: boolean;
  isPosEdited: boolean;
}

const initialState: BoardSlice = {
  board: {
    title: '',
    custom: {
      background: '',
    },
    lists: [],
  },
  status: '',
  error: '',
  isBoardLoaded: false,
  isPosEdited: false,
};

export const fetchBoard = createAsyncThunk('board/fetchBoard', async (boardId: string) => {
  try {
    const response: { board: IBoard } = await instance.get(`/board/${boardId}`);
    return response;
  } catch (e: unknown) {
    const error = e as AxiosError;
    throw new Error(error.message);
  }
});

export const editBoard = createAsyncThunk('board/editBoard', async (editData: IBoardEdit) => {
  const { boardId, data } = editData;
  try {
    const response: { board: IBoard } = await instance.put(`/board/${boardId}`, data);
    return response;
  } catch (e: unknown) {
    const error = e as AxiosError;
    throw new Error(error.message);
  }
});

export const addColumn = createAsyncThunk('board/addColumn', async (postData: IColumnPost) => {
  try {
    const { boardId, data } = postData;
    await instance.post(`/board/${boardId}/list`, data);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

export const editColumn = createAsyncThunk('board/editColumn', async (editData: IColumnEdit) => {
  const { boardId, listId, data } = editData;
  try {
    await instance.put(`board/${boardId}/list/${listId}`, data);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

export const editColumnsPosition = createAsyncThunk('board/editColumnsPosition', async (editData: IColumnEditPos) => {
  const { boardId, data } = editData;

  try {
    await instance.put(`board/${boardId}/list`, data);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

export const editCardsPosition = createAsyncThunk('board/editCardsPosition', async (editData: ICardEditPos) => {
  const { boardId, data } = editData;
  try {
    await instance.put(`board/${boardId}/card`, data);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

export const deleteColumn = createAsyncThunk('board/deleteColumn', async (delData: IColumnDelete) => {
  const { boardId, listId } = delData;
  try {
    await instance.delete(`board/${boardId}/list/${listId}`);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.pending, (state) => {
      state.status = 'loading';
      state.error = '';
    });
    builder.addCase(fetchBoard.fulfilled.type, (state, action: PayloadAction<IBoard>) => {
      state.isBoardLoaded = true;
      state.status = 'resolved';
      state.board = action.payload;
    });
    builder.addCase(fetchBoard.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(addColumn.fulfilled.type, (state, action: PayloadAction<IColumn>) => {
      state.status = 'resolved';
      state.board.lists.push(action.payload);
    });
    builder.addCase(addColumn.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(editColumnsPosition.fulfilled, (state) => {
      state.isPosEdited = !state.isPosEdited;
    });
    builder.addCase(editColumnsPosition.rejected, (state) => {
      state.isPosEdited = false;
    });
    builder.addCase(editCardsPosition.fulfilled, (state) => {
      state.isPosEdited = !state.isPosEdited;
    });
    builder.addCase(editCardsPosition.rejected, (state) => {
      state.isPosEdited = false;
    });
    builder.addCase(deleteColumn.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(deleteColumn.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default boardSlice.reducer;
