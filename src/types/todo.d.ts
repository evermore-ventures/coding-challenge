export interface Todo {
    id: number;
    name: string;
    priority: string;
    state: string;
}

export interface TodoLists {
    id: number;
    name: string;
    todos: Todo[]
}