import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { Task, TodosState } from '../types';
import todoList from './todoList';

// Load from localStorage
const savedFilterByState: any = localStorage.getItem('filterByState') || 'select';
let savedIsAscending = localStorage.getItem('isAscending') ? JSON.parse(localStorage.getItem('isAscending') as any).isAscending :  false;

todoList.forEach((task: any) => {
    task.list = 'default'; // Add the new property
});

console.log('local saved isAscending', savedIsAscending);
console.log('sia', savedIsAscending);

const initialState: TodosState = {
  tasks: todoList as Task[],
  currentList: 'default',
  lists: ['default'],
  // sortOrder: 'priority',
  isAscending: savedIsAscending,
  filterByState: savedFilterByState,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTaskList: (state, action: PayloadAction<string>) => {
      state.lists.push(action.payload);
    },
    selectTaskList: (state, action: PayloadAction<string>) => {
      state.currentList = action.payload;
    },
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newTask: Task = { id: Date.now(), ...action.payload };
      state.tasks.unshift(newTask); // add to top of the list
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = action.payload;
      }
    },
    updateTaskState: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.state =
          task.state === 'todo' ? 'in_progress' : task.state === 'in_progress' ? 'done' : 'todo';
      }
    },
    filterTasks: (
      state,
      action: PayloadAction<'select' | 'all' | 'todo' | 'in_progress' | 'done'>
    ) => {
      state.filterByState = action.payload;
      localStorage.setItem('filterByState', action.payload);
    },
    sortTasks: (state) => {
      // const priorityOrder = { low: 3, medium: 2, high: 1 };

      // Toggle the sorting order
      state.isAscending = !state.isAscending;
      localStorage.setItem('isAscending', JSON.stringify({ 'isAscending': state.isAscending }));

      // state.tasks.sort((a, b) => {
      //   const comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
      //   return state.isAscending ? comparison : -comparison; // Reverse the comparison if not ascending
      // });
    },
    setCurrentList: (state, action: PayloadAction<string>) => {
      state.currentList = action.payload;
    },
    test: (state, action: PayloadAction<void>) => {
      console.log('action');
    },
  },
});

export const {
  addTaskList,
  selectTaskList,
  addTask,
  deleteTask,
  editTask,
  updateTaskState,
  filterTasks,
  sortTasks,
  setCurrentList,
} = todosSlice.actions;

export const selectTest = (state: RootState) => undefined;

export default todosSlice.reducer;
