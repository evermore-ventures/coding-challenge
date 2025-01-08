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
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../state/store';
import { setFilter, setSort } from '../state/filterSlice';

export function FilterComponent({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const Filter = useAppSelector((state: RootState) => state.filter.filter);
  const Sort = useAppSelector((state: RootState) => state.filter.sort);
  const dispatch = useAppDispatch();

  function onChangeSort(e: SelectChangeEvent<string | undefined>) {
    dispatch(setSort({ Priority: e.target.value as 'high' | 'low' | undefined }));
  }
  function onChangeState(e: SelectChangeEvent<string>) {
    dispatch(setFilter({ ...Filter, State: e.target.value }));
  }

  function onChangePriority(e: SelectChangeEvent<string>) {
    dispatch(setFilter({ ...Filter, Priority: e.target.value }));
  }
  function onClose() {
    setOpen(false);
  }
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Filter </DialogTitle>
      <DialogContent>
        <Stack direction={'column'} sx={{ py: 2 }} spacing={2}>
          <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select value={Filter.State} onChange={onChangeState} label="Sort">
                <MenuItem value={'todo'}>Todo</MenuItem>
                <MenuItem value={'in_progress'}>In Progress</MenuItem>
                <MenuItem value={'done'}>Done</MenuItem>
                <MenuItem value={undefined}>None</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select onChange={onChangePriority} value={Filter.Priority} label="Priority">
                <MenuItem value={'low'}>Low</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'high'}>High</MenuItem>
                <MenuItem value={undefined}>None</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogTitle>Sort</DialogTitle>
      <DialogContent>
        <Stack direction={'column'} sx={{ py: 2 }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select onChange={onChangeSort} value={Sort.Priority} label="Priority">
              <MenuItem value={'high'}>Higher</MenuItem>
              <MenuItem value={'low'}>Lower</MenuItem>
              <MenuItem value={undefined}>None</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="button" color="error" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
