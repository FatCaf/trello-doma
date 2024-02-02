/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ICard, ICardDelete, ICardEdit, ICardPost } from '../../models/models';
import instance from '../../api/requests';

interface CardSlice {
  card: ICard;
  status: string;
  error: unknown;
}

const initialState: CardSlice = {
  card: {
    id: 0,
    title: '',
    position: 0,
    list_id: 0,
    description: '',
    users: [],
    custom: '',
  },
  status: '',
  error: '',
};

export const addCard = createAsyncThunk('card/addCard', async (postData: ICardPost) => {
  const { boardId, data } = postData;
  try {
    await instance.post(`board/${boardId}/card`, data);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

export const deleteCard = createAsyncThunk('card/deleteCard', async (deleteData: ICardDelete) => {
  const { boardId, cardId } = deleteData;
  try {
    await instance.delete(`board/${boardId}/card/${cardId}`);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

export const editCard = createAsyncThunk('card/editCard', async (editData: ICardEdit) => {
  const { cardId, boardId, data } = editData;
  try {
    await instance.put(`board/${boardId}/card/${cardId}`, data);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    extractDataForModal: (state, action) => {
      state.card = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCard.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(addCard.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(editCard.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(editCard.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(deleteCard.fulfilled, (state) => {
      state.status = 'resolved';
    });
  },
});

export const { extractDataForModal } = cardSlice.actions;

export default cardSlice.reducer;
