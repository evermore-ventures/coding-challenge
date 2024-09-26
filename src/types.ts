interface Task {
    id: number;
    name: string;
    state: 'todo' | 'in_progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    list: string;
}

interface TodosState {
    tasks: Task[];
    currentList: string;
    isAscending: Boolean;
    filterByState: 'select' | 'all' | 'todo' | 'in_progress' | 'done';
    lists: string[];
}

export type { Task, TodosState };