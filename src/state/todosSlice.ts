import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import todoList from '../app/todoList';
import { todoAction } from '../types';

const stateProgression: Record<string,string> = {
  todo:'in_progress',
  'in_progress':'done'
}
const initialState: {todos: todoAction[], purpose: string[],selectedPurpose:string|undefined } = {
  todos: todoList.reverse(),
  purpose:[],
  selectedPurpose:undefined
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<Omit<todoAction,"id">>) => {
      state.todos.unshift({id: (state.todos[0].id +1) ,...action.payload})
    },
    editTask: (state, action: PayloadAction<todoAction>) => {
      const todoToEdit = state.todos.findIndex(todo => todo.id == action.payload.id) 
      state.todos[todoToEdit] = action.payload
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const todoToDelete = state.todos.findIndex(todo => todo.id == action.payload) 
      state.todos.splice(todoToDelete,1)
    },
    proceedTask: (state, action: PayloadAction<number>) => {
      const todoToProceed = state.todos.findIndex(todo => todo.id == action.payload) 
      state.todos[todoToProceed] = {...state.todos[todoToProceed] , state: stateProgression[state.todos[todoToProceed].state]  }
    },
    createPurpose: (state, action: PayloadAction<string>) => {
      state.purpose.push(action.payload)
    },
    setSelectedPurpose: (state, action: PayloadAction<string>) => {
      state.selectedPurpose = action.payload
    },
 
  },
});

export const {createTask,proceedTask,editTask,deleteTask,createPurpose,setSelectedPurpose} = todosSlice.actions;

export default todosSlice.reducer;
