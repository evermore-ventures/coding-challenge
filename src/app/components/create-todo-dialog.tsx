import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { create } from "../../state/todosSlice";

export default function CreateTodoDialog({todoListId}: {todoListId: number}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [priority, setPriority] = useState('low');

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        dispatch(create({ todoListId, name, priority, state: 'todo' }));
        setOpen(false);
    };
  return (
    <>
        <Button variant='outlined' size="small" onClick={handleClickOpen}>
            Create Task
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth >
          <DialogTitle>Create New Task</DialogTitle>
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
            <FormControl fullWidth>
              <InputLabel id="priority-select-label">Priority</InputLabel>
              <Select
                  labelId="priority-select-label"
                  id="priority-select"
                  value={priority}
                  label="Priority"
                  onChange={(e) => setPriority(e.target.value)}
              >
                  <MenuItem value={'high'}>High</MenuItem>
                  <MenuItem value={'medium'}>Medium</MenuItem>
                  <MenuItem value={'low'}>Low</MenuItem>
              </Select>
            </FormControl>

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