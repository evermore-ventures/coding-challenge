// DeleteTaskModal.tsx
import { useAppDispatch } from '../../state/store';
import { deleteTask } from '../../state/todosSlice';
import { Dialog, DialogActions, Button, DialogTitle } from '@mui/material';

const DeleteTaskModal = ({ taskId, open, handleClose }: {
    taskId: number;
    open: boolean;
    handleClose: () => void;
}) => {
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    dispatch(deleteTask(taskId));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
      <DialogActions>
        <Button onClick={handleConfirm}>Confirm</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskModal;
