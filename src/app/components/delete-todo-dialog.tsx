import { Dialog, DialogTitle, DialogActions, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { remove } from "../../state/todosSlice";
import { Delete } from "@mui/icons-material";

export default function DeleteTodoDialog({todoListId, id}: {todoListId: number, id: number}) {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemove = (id: number) => {
        dispatch(remove({ todoListId, id }));
        setOpen(false);
    }

  return (
    <>
        <IconButton onClick={handleClickOpen}>
            <Delete fontSize="small" />
        </IconButton>
        <Dialog open={open} onClose={handleClose} fullWidth >
          <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={()=>{ handleRemove(id)}}>Confirm</Button>
          </DialogActions>
        </Dialog> 
    </>

  )
}