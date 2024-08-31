import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskList } from '../types';

type TasksState = {
  taskLists: TaskList[];
};

const initialState: TasksState = {
  taskLists: [
    {
      id: 1,
      taskListName: 'Default',
      tasks: [],
    },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Action to add a new task list
    addTaskList: (state, action: PayloadAction<{ id: number; taskListName: string }>) => {
      state.taskLists.push({
        id: action.payload.id,
        taskListName: action.payload.taskListName,
        tasks: [],
      });
    },

    // Action to add a new task to a specific task list
    addTask: (state, action: PayloadAction<{ listId: number; task: Task }>) => {
      const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
      if (taskList) {
        taskList.tasks.unshift(action.payload.task); // Add new task to the beginning of the task array
      }
    },

    // Action to delete a task from a specific task list by task id
    deleteTask: (state, action: PayloadAction<{ listId: number; taskId: number }>) => {
      const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
      if (taskList) {
        taskList.tasks = taskList.tasks.filter((task) => task.id !== action.payload.taskId);
      }
    },

    // Action to edit a task in a specific task list
    editTask: (state, action: PayloadAction<{ listId: number; task: Task }>) => {
      const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
      if (taskList) {
        const index = taskList.tasks.findIndex((task) => task.id === action.payload.task.id);
        if (index !== -1) {
          taskList.tasks[index] = action.payload.task; // Update the task with new details
        }
      }
    },

    // Action to change the state of a task in a specific task list
    changeTaskState: (state, action: PayloadAction<{ listId: number; taskId: number }>) => {
      const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
      if (taskList) {
        const task = taskList.tasks.find((task) => task.id === action.payload.taskId);
        if (task && task.state === 'todo') {
          task.state = 'in progress';
        } else if (task && task.state === 'in progress') {
          task.state = 'done';
        }
      }
    },

    // Only for seeding initial data
    seed: (state, action: PayloadAction<{ taskLists: TasksState['taskLists'] }>) => {
      state.taskLists = action.payload.taskLists;
    },
  },
});

export const { addTaskList, addTask, deleteTask, editTask, changeTaskState, seed } =
  tasksSlice.actions;

export default tasksSlice.reducer;
