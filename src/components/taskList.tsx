import React from 'react';
import { List, Typography } from '@mui/material';

import TaskItem from './taskItem';
import { changeTaskState, deleteTask, editTask } from '../state/tasksSlice';
import { useAppDispatch } from '../state/store';
import { Task, TaskList } from '../types';

type TaskListProps = {
  taskList: TaskList;
};

const TasksList: React.FC<TaskListProps> = ({ taskList }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (taskId: number) => {
    dispatch(deleteTask({ listId: taskList.id, taskId }));
  };

  const handleEdit = (task: Task) => {
    dispatch(editTask({ listId: taskList.id, task }));
  };

  const handleStateChange = (taskId: number) => {
    dispatch(changeTaskState({ listId: taskList.id, taskId }));
  };

  if (taskList.tasks.length === 0) {
    return <Typography sx={{ color: '#706c6a' }}>All Done!</Typography>;
  }

  return (
    <List sx={{ overflow: 'scroll' }}>
      {taskList.tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onStateChange={handleStateChange}
        />
      ))}
    </List>
  );
};

export default TasksList;
