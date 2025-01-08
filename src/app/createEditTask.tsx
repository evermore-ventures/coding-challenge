import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { todoAction } from '../types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../state/store';
import { createTask, editTask } from '../state/todosSlice';

const initialFormData = {
  name: '',
  state: 'todo',
  priority: '',
};

export function CreateEditTask({
  todoItem,
  open,
  setOpen,
  setSelectedTodo,
}: {
  todoItem?: todoAction;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTodo: Dispatch<SetStateAction<todoAction | undefined>>;
}) {
  const [initialForm, setInitialForm] = useState(initialFormData);
  const SelectedPurpose = useAppSelector((state: RootState) => state.todos.selectedPurpose);

  const dispatch = useAppDispatch();

  function onClose() {
    setSelectedTodo(undefined);
    setOpen(false);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInitialForm((prevValue) => {
      return {
        ...prevValue,
        name: e.target.value,
      };
    });
  }

  function handleStateChange(e: SelectChangeEvent<string>) {
    setInitialForm((prevValue) => {
      return {
        ...prevValue,
        state: e.target.value,
      };
    });
  }

  function handlePriorityChange(e: SelectChangeEvent<string>) {
    setInitialForm((prevValue) => {
      return {
        ...prevValue,
        priority: e.target.value,
      };
    });
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      initialForm.name.length > 0 &&
      initialForm.priority.length > 0 &&
      initialForm.state.length > 0
    ) {
      if (todoItem) {
        dispatch(editTask({ id: todoItem.id, purpose: todoItem.purpose, ...initialForm }));
        setSelectedTodo(undefined);
      } else {
        dispatch(createTask({ ...initialForm, purpose: SelectedPurpose }));
      }

      onClose();
    }
  }

  useEffect(() => {
    if (todoItem)
      setInitialForm({
        name: todoItem.name,
        state: todoItem.state,
        priority: todoItem.priority,
      });
    else {
      setInitialForm(initialFormData);
    }

    return () => setInitialForm(initialFormData);
  }, [open, todoItem]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{todoItem ? 'Edit Task' : 'Create Task'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2} py={1}>
            <TextField required value={initialForm.name} onChange={handleNameChange} label="Name" />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                required
                value={initialForm.priority}
                onChange={handlePriorityChange}
                label="Priority"
              >
                <MenuItem value={'low'}>Low</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'high'}>High</MenuItem>
              </Select>
            </FormControl>
            {!!todoItem && (
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  required
                  value={initialForm.state}
                  onChange={handleStateChange}
                  label="State"
                >
                  <MenuItem value={'todo'}>Todo</MenuItem>
                  <MenuItem value={'in_progress'}>In Progress</MenuItem>
                  <MenuItem value={'done'}>Done</MenuItem>
                </Select>
              </FormControl>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="button" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
