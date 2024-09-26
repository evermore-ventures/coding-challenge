// AddTaskModal.tsx
import { useState } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { addTask } from '../../state/todosSlice';
import { Dialog, TextField, Button, Select, MenuItem, DialogActions, DialogTitle } from '@mui/material';

const StyledDialog = styled(Dialog)`
  padding: 1em;
`;

const AddTaskModal = ({ open, handleClose }: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { currentList } = useAppSelector((state) => state.todos);
  const [name, setName] = useState('');
  const [priority, setPriority] = useState<any>('low');
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (name.trim()) {
      dispatch(addTask({ name, priority, state: 'todo', list: currentList }));
      handleClose();
    }
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle>Add Task</DialogTitle>
      <TextField
        fullWidth
        label="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </Select>
      <DialogActions>
        <Button onClick={handleSubmit}>Add Task</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default AddTaskModal;
