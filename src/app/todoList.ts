import { Task } from '../types';

const todoList: Task[] = [
  {
    id: 1,
    name: 'Read a book',
    state: 'todo',
    priority: 'low',
    listId: 'list-1',
  },
  {
    id: 2,
    name: 'Walk the dog',
    state: 'todo',
    priority: 'high',
    listId: 'list-1',
  },
  {
    id: 3,
    name: 'Go to Market',
    state: 'done',
    priority: 'medium',
    listId: 'list-1',
  },
  {
    id: 4,
    name: 'Learn Typescript',
    state: 'in_progress',
    priority: 'medium',
    listId: 'list-1',
  },
  {
    id: 5,
    name: 'Call Mom',
    state: 'todo',
    priority: 'high',
    listId: 'list-1',
  },
  {
    id: 6,
    name: 'Cook lunch',
    state: 'done',
    priority: 'low',
    listId: 'list-1',
  },
];

export default todoList;
