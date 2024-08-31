import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { TaskPriority } from '../types';
import { TASK_PRIORITY_OPTIONS } from '../constants';

interface TaskFormModalProps {
  open: boolean;
  defaultState?: {
    taskName: string;
    priority: TaskPriority;
  };
  onClose?: () => void;
  onSubmit?: (name: string, priority: TaskPriority) => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ open, onClose, onSubmit, defaultState }) => {
  const [taskName, setTaskName] = useState(defaultState?.taskName || '');
  const [priority, setPriority] = useState<TaskPriority>(defaultState?.priority || 'medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) onSubmit(taskName, priority);
    setTaskName('');
    if (onClose) onClose();
  };

  return (
    <Modal
      sx={{
        margin: 'auto',
        maxWidth: '475px',
      }}
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: 'white',
          margin: 'auto',
          marginTop: '20vh',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          {defaultState?.taskName ? 'Update Task' : 'Add New Task'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              {TASK_PRIORITY_OPTIONS.map((option) => {
                return (
                  <MenuItem value={option.value} key={option.value}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Button
            sx={{
              marginTop: 2,
            }}
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              !taskName ||
              (defaultState?.taskName === taskName && defaultState?.priority === priority)
            }
          >
            {defaultState?.taskName ? 'Update Task' : 'Add Task'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskFormModal;
