/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { IBoard } from '../../models/models';

interface CardModalSlice {
  status: string;
  error: unknown;
  allBoards: IBoard[];
}

const initialState: CardModalSlice = {
  allBoards: [],
  status: '',
  error: '',
};

const cardModalSlice = createSlice({
  name: 'cardModal',
  initialState,
  reducers: {},
});

export default cardModalSlice.reducer;
