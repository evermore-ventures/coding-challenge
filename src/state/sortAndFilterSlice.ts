/**
 * Create sortAndFilterSlice, to retain the state globally during app lifecycle.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortAndFilterState } from '../types';

const initialState: SortAndFilterState = {
  sortOption: 'priority',
  filterOption: 'all',
  selectedTaskListId: 1, // default tasklist is selected by default
};

const sortAndFilterSlice = createSlice({
  name: 'sortAndFilter',
  initialState,
  reducers: {
    updateSortOption: (
      state,
      action: PayloadAction<{ option: SortAndFilterState['sortOption'] }>
    ) => {
      state.sortOption = action.payload.option;
    },

    updateFilterOption: (
      state,
      action: PayloadAction<{ option: SortAndFilterState['filterOption'] }>
    ) => {
      state.filterOption = action.payload.option;
    },

    setSelectedTaskList: (
      state,
      action: PayloadAction<{ option: SortAndFilterState['selectedTaskListId'] }>
    ) => {
      state.selectedTaskListId = action.payload.option;
    },
  },
});

export const { updateSortOption, updateFilterOption, setSelectedTaskList } =
  sortAndFilterSlice.actions;

export default sortAndFilterSlice.reducer;
