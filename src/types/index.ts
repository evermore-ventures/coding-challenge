export interface Task {
  id: number;
  name: string;
  priority: 'high' | 'medium' | 'low';
  state: 'todo' | 'in_progress' | 'done';
  listId: string;
}

export interface TaskList {
  id: string;
  name: string;
}

export interface CreateTaskModalData {
  type: 'createTask';
  listId: string;
}

export interface EditTaskModalData {
  type: 'editTask';
  task: Task;
}

export interface DeleteTaskModalData {
  type: 'deleteTask';
  taskId: number;
}

export interface FilterModalData {
  type: 'filterModal';
  listId: string;
}

export interface DeleteListModalData {
  type: 'deleteList';
  listId: string;
}

export type ModalData = any; // eslint-disable-line @typescript-eslint/no-explicit-any
