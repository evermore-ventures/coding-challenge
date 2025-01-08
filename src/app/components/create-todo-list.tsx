import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodoList } from "../../state/todosSlice";

export default function CreateTodoList() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
   
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        dispatch(createTodoList({ name }));
        setOpen(false);
    };
  return (
    <>
        <Button variant='contained' onClick={handleClickOpen}>
            Create List
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth >
          <DialogTitle>Create New Todo List</DialogTitle>
          <DialogContent>
            <div className="flex flex-col gap-6">
              <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
            />
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate}>Create</Button>
          </DialogActions>
        </Dialog> 
    </>

  )
}