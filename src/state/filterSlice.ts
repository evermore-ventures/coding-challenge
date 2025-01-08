import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TFilter, TSort } from '../types';

const initialState: {filter:TFilter, sort:TSort } = {
  filter: {
    State: 'done',
    Priority: undefined
  },
  sort:{
    Priority: 'high'
  }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<TFilter>) => {
      state.filter = action.payload
    },
    setSort: (state, action: PayloadAction<TSort>) => {
      state.sort = action.payload
    },
  
  },
});

export const {setFilter,setSort} = filterSlice.actions;

export default filterSlice.reducer;
