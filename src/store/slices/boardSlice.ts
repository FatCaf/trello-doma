/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IBoard, IColumn, IBoardEdit, IChangePos, IColumnDelete, IColumnEdit, IColumnPost } from '../../models/models';
import instance from '../../api/requests';

interface BoardSlice {
  board: IBoard;
  status: string;
  error: unknown;
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

export const deleteColumn = createAsyncThunk('board/deleteColumn', async (delData: IColumnDelete) => {
  const { boardId, listId } = delData;
  try {
    await instance.delete(`board/${boardId}/list/${listId}`);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

export const editColPos = createAsyncThunk('board/editColPos', async (editData: IChangePos) => {
  const { boardId, listId, data } = editData;

  try {
    await instance.put(`board/${boardId}/list/${listId}`, data);
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
