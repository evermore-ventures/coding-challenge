// AddTaskListModal.tsx
import { useState } from 'react';
import { useAppDispatch } from '../../state/store';
import { addTaskList } from '../../state/todosSlice';
import { Dialog, TextField, Button, DialogActions, DialogTitle } from '@mui/material';

const AddTaskListModal = ({ open, handleClose }: {
    open: boolean;
    handleClose: () => void;
}) => {
  const [listName, setListName] = useState('');
    const dispatch = useAppDispatch();
  
    // const handleSubmit = () => {
    //   if (listName.trim()) {
    //     dispatch(setCurrentList(listName));
    //     handleClose();
    //   }
    // };


    const handleSubmit = () => {
      if (listName.trim()) {
        dispatch(addTaskList(listName));
        handleClose();
      }
    };
  
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Task List</DialogTitle>
        <TextField
          fullWidth
          label="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <DialogActions>
          <Button onClick={handleSubmit}>Create List</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default AddTaskListModal;
  