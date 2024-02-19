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
  ICardEdit,
  IColorEdit,
} from '../../models/models';
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

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    deleteColumnLocally: (state, action) => {
      state.board.lists = state.board.lists.filter((list) => list.id !== Number(action.payload));
    },
    deleteCardLocally: (state, action) => {
      state.board.lists.forEach(
        (list) => (list.cards = list.cards.filter((card) => card.id !== Number(action.payload)))
      );
    },
    editBoardLocally: (state, action: PayloadAction<IBoardEdit>) => {
      const { title } = action.payload.data;
      state.board.title = title;
    },
    editColumnLocally: (state, action: PayloadAction<IColumnEdit>) => {
      const { listId, data } = action.payload;
      const editedList = state.board.lists.find((list) => list.id === Number(listId));
      if (editedList) editedList.title = data.title;
    },
    editCardLocally: (state, action: PayloadAction<ICardEdit>) => {
      const { cardId, data } = action.payload;

      const foundList = state.board.lists.find((list) => list.cards.some((card) => card.id === Number(cardId)));
      if (foundList) {
        const foundCard = foundList.cards.find((card) => card.id === Number(cardId));

        if (foundCard) {
          if (foundCard.title === data.title) foundCard.description = data.description as string;
          foundCard.title = data.title as string;
        }
      }
    },
    editBoardColorLocally: (state, action: PayloadAction<IColorEdit>) => {
      const { data } = action.payload;
      state.board.custom.background = data.custom.background;
    },
  },
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

export const {
  deleteColumnLocally,
  deleteCardLocally,
  editBoardLocally,
  editColumnLocally,
  editCardLocally,
  editBoardColorLocally,
} = boardSlice.actions;
export default boardSlice.reducer;
