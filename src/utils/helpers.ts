import { Task } from '../types';
import { PRIORITIES } from './constants';

export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // Sort by priority first (higher priority first: High -> Medium -> Low)
    const priorityComparison = PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority);

    if (priorityComparison !== 0) {
      return priorityComparison;
    }

    // If priorities are the same, sort by state ('Done' first)
    if (a.state === 'done' && b.state !== 'done') return -1;
    if (a.state !== 'done' && b.state === 'done') return 1;

    // If priorities and states are the same, sort by creation time (newest first)
    return b.id - a.id; // Direct number comparison
  });
};
