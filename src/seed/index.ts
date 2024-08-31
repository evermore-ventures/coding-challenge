import store from '../state/store';
import { seed } from '../state/tasksSlice';
import { TaskList } from '../types';

const initialState: {
  taskLists: TaskList[];
} = {
  taskLists: [
    {
      id: 1,
      taskListName: 'Default',
      tasks: [
        { id: 1, name: 'Buy groceries', state: 'todo', priority: 'high' },
        { id: 2, name: 'Purchase cleaning supplies', state: 'in progress', priority: 'medium' },
        { id: 3, name: 'Order new kitchen appliances', state: 'todo', priority: 'low' },
        { id: 4, name: 'Get pet food', state: 'done', priority: 'medium' },
        { id: 5, name: 'Buy home decor items', state: 'todo', priority: 'low' },
      ],
    },
    {
      id: 2,
      taskListName: 'Weekend Chores',
      tasks: [
        { id: 6, name: 'Clean the garage', state: 'in progress', priority: 'high' },
        { id: 7, name: 'Mow the lawn', state: 'todo', priority: 'medium' },
        { id: 8, name: 'Wash the car', state: 'done', priority: 'low' },
        { id: 9, name: 'Organize closet', state: 'todo', priority: 'medium' },
        { id: 10, name: 'Fix leaking faucet', state: 'in progress', priority: 'high' },
        { id: 11, name: 'Paint the fence', state: 'todo', priority: 'high' },
      ],
    },
    {
      id: 3,
      taskListName: 'Travel Preparation',
      tasks: [
        { id: 12, name: 'Book flights', state: 'done', priority: 'high' },
        { id: 13, name: 'Pack luggage', state: 'in progress', priority: 'medium' },
        { id: 14, name: 'Buy travel insurance', state: 'todo', priority: 'high' },
      ],
    },
  ],
};

export const seedData = () => {
  store.dispatch(seed({ taskLists: initialState.taskLists }));
};
