import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_VIEW_MODE,
  DEFAULT_TYPE,
  DEFAULT_SEARCH_TERM,
  DEFAULT_YEAR,
  ROWS_PER_PAGE,
  DEFAULT_PAGE,
} from '../../config/api';
import { MovieListState } from '../../types/omdb';

const initialState: MovieListState = {
  searchTerm: DEFAULT_SEARCH_TERM,
  year: DEFAULT_YEAR,
  type: DEFAULT_TYPE,
  page: DEFAULT_PAGE,
  viewMode: DEFAULT_VIEW_MODE,
  rowsPerPage: ROWS_PER_PAGE,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = DEFAULT_PAGE;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
      state.page = DEFAULT_PAGE;
    },
    setType: (state, action: PayloadAction<MovieListState['type']>) => {
      state.type = action.payload;
      state.page = DEFAULT_PAGE;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setViewMode: (state, action: PayloadAction<MovieListState['viewMode']>) => {
      state.viewMode = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = DEFAULT_PAGE;
    },
    setAllFilters: (state, action: PayloadAction<Partial<MovieListState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setSearchTerm,
  setYear,
  setType,
  setPage,
  setViewMode,
  setRowsPerPage,
  setAllFilters,
} = movieSlice.actions;

export default movieSlice.reducer;
