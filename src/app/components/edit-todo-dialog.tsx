import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem, Select, FormControl, InputLabel, IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { edit } from "../../state/todosSlice";
import { Todo } from "../../types";
import { Edit } from "@mui/icons-material";

export default function EditTodoDialog({todoListId, ...params}: Todo & {todoListId: number}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(params.name);
    const [priority, setPriority] = useState(params.priority);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = () => {
        dispatch(edit({ todoListId, todo: { id: params.id, name, priority, state: 'todo' }   }));
        setOpen(false);
    };
  return (
    <>
        <IconButton onClick={handleClickOpen}>
            <Edit fontSize="small" />
        </IconButton>
        <Dialog open={open} onClose={handleClose} fullWidth >
          <DialogTitle>Edit Task # {params.id} </DialogTitle>
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
            <Button onClick={handleEdit}>Save</Button>
          </DialogActions>
        </Dialog> 
    </>

  )
}