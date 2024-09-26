// TaskItem.tsx
import { useState } from 'react';
import { useAppDispatch } from '../../state/store';
import { updateTaskState } from '../../state/todosSlice';
import { Card, Button, Typography, IconButton, Chip } from '@mui/material';
import EditTaskModal from './EditTaskModal';
import DeleteTaskModal from './DeleteTaskModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../../types';
import styled from '@emotion/styled';

const TaskItemCard = styled(Card)`
  margin: 10px 0;
  padding: 0.5em 1em;
  display: flex;
  justify-content: space-between;

  .details {
    display: flex;

    .task-name {
      margin-right: 1em;
      font-weight: 500;
      min-width: 10em;
    }
  }
  .task-actions {
    display: flex;
    align-items: center;

    .task-status {
      margin: '1em 0';
      min-width: 15em;
    }
  }
`;

const TaskItem = ({ task }: { task: Task }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleStateChange = () => {
    dispatch(updateTaskState(task.id));
  };

  function colorBasedOnPriority(priority: 'low' | 'medium' | 'high'): string {
    switch (priority) {
      case 'low':
        return 'grey';
      case 'medium':
        return 'orange';
      case 'high':
        return 'red';
      default:
        return 'grey'; // Fallback color
    }
  }

  function colorBasedOnState(state: 'todo' | 'in_progress' | 'done'): string {
    switch (state) {
      case 'todo':
        return 'grey';
      case 'in_progress':
        return 'orange';
      case 'done':
        return 'green';
      default:
        return 'grey'; // Fallback color
    }
  }

  return (
    <TaskItemCard>
      <div className="details">
        <p className="task-name">{task.name}</p>
      </div>

      <div className="task-actions">
        <p
          // label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} // Capitalize the first letter
          style={{
            backgroundColor: 'white',
            color: colorBasedOnPriority(task.priority),
            border: `1px solid ${colorBasedOnPriority(task.priority)}`,
            margin: '1.2em 1em',
            width: '7em',
            textAlign: 'center',
            fontSize: '0.75em',
            verticalAlign: 'middle',
            padding: '0.25em',
            height: '2em',
          }}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </p>

        <Button
          disabled={task.state === 'done'}
          className="task-status"
          onClick={handleStateChange}
          style={{ color: colorBasedOnState(task.state) }}
        >
          {task.state}
        </Button>
        <IconButton onClick={() => setEditOpen(true)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setDeleteOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </div>
      <EditTaskModal open={editOpen} task={task} handleClose={() => setEditOpen(false)} />
      <DeleteTaskModal
        taskId={task.id}
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
      />
    </TaskItemCard>
  );
};

export default TaskItem;
