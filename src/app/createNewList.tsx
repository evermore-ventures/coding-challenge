import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

export function CreateNewList({
  open,
  setOpen,
  confirmCallback,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmCallback: (listName: string) => void;
}) {
  const [listName, setListName] = useState('');
  function onClose() {
    setOpen(false);
    setListName('');
  }
  return (
    <Dialog open={open}>
      <DialogTitle>Create List </DialogTitle>
      <DialogContent>
        <TextField value={listName} onChange={(e) => setListName(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button type="button" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => {
            confirmCallback(listName);
            onClose();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
