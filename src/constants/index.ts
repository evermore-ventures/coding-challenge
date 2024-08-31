import { SortAndFilterState, TaskPriority } from '../types';

export const SORT_OPTIONS: {
  value: SortAndFilterState['sortOption'];
  label: string;
}[] = [
  { value: 'priority', label: 'Priority' },
  { value: 'state', label: 'State' },
];

export const FILTER_OPTIONS: {
  value: SortAndFilterState['filterOption'];
  label: string;
}[] = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To Do' },
  { value: 'in progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

export const TASK_PRIORITY_OPTIONS: {
  value: TaskPriority;
  label: string;
}[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];
