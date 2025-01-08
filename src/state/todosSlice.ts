import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import todoList from '../app/todoList';
import { Todo, TodoLists } from '../types';
import { getPriorityVal, getStateVal } from '../utils';


const initialState: TodoLists[] = [{ id: 0, name: 'default', todos: todoList }];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<{ todoListId: number, id: number }>) => {
      const listIdx = state.findIndex(todoList => todoList.id === action.payload.todoListId);
      const index = state[listIdx].todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        switch (state[listIdx].todos[index].state) {
          case 'todo':
            state[listIdx].todos[index].state = 'in_progress';
            break;
          case 'in_progress':
            state[listIdx].todos[index].state = 'done';
            break;
        }
      }
    },
    createTodoList: (state, action: PayloadAction<{ name: string }>) => {
      state.push({
        id: state.length + 1,
        name: action.payload.name,
        todos: []
      });
    },
    create: (state, action: PayloadAction<{ todoListId: number, name: string, priority: string, state: string }>) => {
      const idx = state.findIndex(todoList => todoList.id === action.payload.todoListId);
      state[idx].todos.push({
        name: action.payload.name,
        priority: action.payload.priority,
        state: action.payload.state,
        id: state[idx].todos.length + 1
      });
    },
    edit: (state, action: PayloadAction<{ todoListId: number, todo: Todo }>) => {
      const listIdx = state.findIndex(todoList => todoList.id === action.payload.todoListId);
      const index = state[listIdx].todos.findIndex(todo => todo.id === action.payload.todo.id);
      if (index !== -1) {
        state[listIdx].todos[index] = action.payload.todo;
      }
    },
    delete: (state, action: PayloadAction<{ todoListId: number, id: number }>) => {
      const listIdx = state.findIndex(todoList => todoList.id === action.payload.todoListId);
      const index = state[listIdx].todos.findIndex(todo => todo.id === action.payload.id);
      state[listIdx].todos.splice(index, 1)
    },
    sort: (state, action: PayloadAction<{ todoListId: number, col: string }>) => {

      const listIdx = state.findIndex(todoList => todoList.id === action.payload.todoListId);

      if (action.payload.col === 'priority') {
        state[listIdx].todos.sort((a, b) => getPriorityVal(b.priority) - getPriorityVal(a.priority));
      }
      if (action.payload.col === 'state') {
        state[listIdx].todos.sort((a, b) => getStateVal(b.state) - getStateVal(a.state));
      }
    }
  },
});

export const { create, edit, delete: remove, changeState, sort, createTodoList } = todosSlice.actions;
export const selectTest = (state: RootState) => state.todos;

export default todosSlice.reducer;
