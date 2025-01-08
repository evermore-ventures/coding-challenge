
const STATE_LABEL: Record<string, string> = {
    "todo": "To Do",
    "in_progress": "In Progress",
    "done": "Done"
}

const STATE_VALUE: Record<string, number> = {
    "todo": 0,
    "in_progress": 1,
    "done": 2
}

const PRIORITY_VALUE: Record<string, number> = {
    "high": 2,
    "medium": 1,
    "low": 0
}

export const getStateLabel = (state: string) => STATE_LABEL[state] || state;
export const getPriorityVal = (priority: string) => PRIORITY_VALUE[priority] || 0;
export const getStateVal = (state: string) => STATE_VALUE[state] || 0;