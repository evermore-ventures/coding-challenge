export type TaskState = 'todo' | 'in progress' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
  id: number;
  name: string;
  state: TaskState;
  priority: TaskPriority;
};

export type TaskList = {
  id: number;
  taskListName: string;
  tasks: Task[];
};

export type SortAndFilterState = {
  sortOption: 'priority' | 'state';
  filterOption: 'all' | TaskState;
  selectedTaskListId: number;
};
