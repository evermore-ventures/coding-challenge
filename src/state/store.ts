import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import tasksReducer from './tasksSlice';
import sortAndFilterReducer from './sortAndFilterSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    sortAndFilter: sortAndFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
