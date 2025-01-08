import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { todoAction } from '../types';

export function ConfirmModal({
  open,
  setOpen,
  todo,
  confirmCallback,
  setSelectedTodo,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  todo: todoAction | undefined;
  confirmCallback: () => void;
  setSelectedTodo: Dispatch<SetStateAction<todoAction | undefined>>;
}) {
  function onClose() {
    setSelectedTodo(undefined);
    setOpen(false);
  }
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Confirm Delete </DialogTitle>
      <DialogContent>Are you sure you want to delete {todo?.name}?</DialogContent>
      <DialogActions>
        <Button type="button" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" onClick={confirmCallback}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
