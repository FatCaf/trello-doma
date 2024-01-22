/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IColumnCard, IColumnCardDelete, IColumnCardPost } from '../../models/models';
import instance from '../../api/requests';

interface CardSlice {
  card: IColumnCard;
  status: string;
  error: unknown;
}

const initialState: CardSlice = {
  card: {
    id: 0,
    title: '',
    position: 0,
    list_id: 0,
  },
  status: '',
  error: '',
};

export const addCard = createAsyncThunk('card/addCard', async (postData: IColumnCardPost) => {
  const { boardId, data } = postData;
  try {
    await instance.post(`board/${boardId.boardId}/card`, data);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

export const deleteCard = createAsyncThunk('card/deleteCard', async (deleteData: IColumnCardDelete) => {
  const { boardId, cardId } = deleteData;
  try {
    await instance.delete(`board/${boardId.boardId}/card/${cardId}`);
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
});

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCard.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(addCard.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default cardSlice.reducer;
