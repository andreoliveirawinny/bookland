import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';

import booksClient from '../client/books';

/**
 * Trunks
 */
export const fetchBooksForYear = createAsyncThunk('books/fetchBooksForYear', async year => {
  const books = await booksClient.fetchBooksForYear(year);

  return books || [];
})

/**
 * Create reducer and actions
 */
export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    list: {},
    year: moment().year(),
    status: '',
    error: ''
  },
  reducers: {
    fetchBooks: state => {
      state.loggedIn = true;
    },
    fetchBooksForYear: state => {
      state.loggedIn = true;
    },
    saveBooks: (state, books) => {
      state.books = books;
    }
  },
  extraReducers: {
    [fetchBooksForYear.pending]: state => {
      state.status = 'loading';
    },
    [fetchBooksForYear.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.list = action.payload || {};
    },
    [fetchBooksForYear.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

/**
 * Actions
 */
export const { saveBooks } = calendarSlice.actions;

/**
 * Selectors
 */
export const selectBooks = state => state.calendar.list;

export default calendarSlice.reducer;
