import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import listReducer from './slices/listSlice';
import modalReducer from './slices/modalSlice';

export const rootReducer = combineReducers({
  tasks: taskReducer,
  lists: listReducer,
  modals: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
