// EditTaskModal.tsx
import { useState } from 'react';
import { useAppDispatch } from '../../state/store';
import { editTask } from '../../state/todosSlice';
import { Dialog, TextField, Button, Select, MenuItem, DialogActions, DialogTitle } from '@mui/material';
import { Task } from '../../types'; // Import the Task type from the appropriate location

const EditTaskModal = ({ task, open, handleClose }: {
    task: Task;
    open: boolean;
    handleClose: () => void;
}) => {
  const [name, setName] = useState(task.name);
  const [priority, setPriority] = useState(task.priority);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(editTask({ ...task, name, priority }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} />
      <Select value={priority} onChange={(e) => setPriority(e.target.value as any)}>
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </Select>
      <DialogActions>
        <Button onClick={handleSubmit}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
