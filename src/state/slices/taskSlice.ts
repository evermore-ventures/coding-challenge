import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';
import { sortTasks } from '../../utils/helpers';
import todoList from '../../app/todoList';

interface TaskState {
  tasks: Task[];
  filters: {
    [listId: string]: {
      filterState: string;
      filterPriority: string;
    };
  };
}

const initialState: TaskState = {
  tasks: todoList,
  filters: {
    'list-1': { filterState: 'All', filterPriority: 'All' },
  },
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      const newTask = action.payload;
      // Put the new task at the front
      state.tasks.unshift(newTask);

      // Sort only the remaining tasks (index 1 to the end)
      const tasksExceptNew = state.tasks.slice(1); // everything except the new one at index 0
      const sorted = sortTasks(tasksExceptNew);

      // Put the new one back at index 0
      state.tasks = [newTask, ...sorted];
    },

    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    changeTaskState(state, action: PayloadAction<number>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        const states: Task['state'][] = ['todo', 'in_progress', 'done'];
        const currentIndex = states.indexOf(task.state);
        const nextState = states[(currentIndex + 1) % states.length]; // Cycle through states
        task.state = nextState; // Type-safe assignment
      }
    },
    setFilterState(state, action: PayloadAction<{ listId: string; filterState: string }>) {
      const { listId, filterState } = action.payload;
      if (!state.filters[listId]) {
        state.filters[listId] = { filterState: 'All', filterPriority: 'All' };
      }
      state.filters[listId].filterState = filterState;
    },
    setFilterPriority(state, action: PayloadAction<{ listId: string; filterPriority: string }>) {
      const { listId, filterPriority } = action.payload;
      if (!state.filters[listId]) {
        state.filters[listId] = { filterState: 'All', filterPriority: 'All' };
      }
      state.filters[listId].filterPriority = filterPriority;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  changeTaskState,
  setFilterState,
  setFilterPriority,
} = taskSlice.actions;
export default taskSlice.reducer;
