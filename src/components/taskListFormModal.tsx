import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface TaskListFormModalProps {
  open: boolean;
  onClose?: () => void;
  onSubmit?: (taskListName: string) => void;
}

const TaskListFormModal: React.FC<TaskListFormModalProps> = (props) => {
  const { open, onClose, onSubmit } = props;

  const [taskListName, setTaskListName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) onSubmit(taskListName);

    // Reset the state & close the modal
    setTaskListName('');
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
          Add New Task List
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Task List Name"
            value={taskListName}
            onChange={(e) => setTaskListName(e.target.value)}
          />
          <Button
            sx={{
              marginTop: 2,
            }}
            variant="contained"
            color="primary"
            type="submit"
            disabled={!taskListName}
          >
            Add
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskListFormModal;
