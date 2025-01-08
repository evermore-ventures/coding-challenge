import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { FilterComponent } from './filterComponent';
import { RootState, useAppDispatch, useAppSelector } from '../state/store';
import { setSelectedPurpose } from '../state/todosSlice';

export function SortComponent() {
  const Purpose = useAppSelector((state: RootState) => state.todos.purpose);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const SelectedPurpose = useAppSelector((state: RootState) => state.todos.selectedPurpose);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (SelectedPurpose) setSelectedValue(SelectedPurpose);
    else setSelectedValue('');
  }, [SelectedPurpose]);
  const [open, setOpen] = useState(false);
  return (
    <Stack direction={'row'} width={'100%'} spacing={2}>
      <FormControl fullWidth>
        <InputLabel>List</InputLabel>
        <Select
          value={selectedValue}
          onChange={(e) => dispatch(setSelectedPurpose(e.target.value as string))}
          label="List"
        >
          {Purpose.map((purpose: string) => {
            return (
              <MenuItem key={purpose} value={purpose}>
                {purpose}
              </MenuItem>
            );
          })}
          <MenuItem value={undefined}>None</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={() => setOpen(true)}>Filter</Button>

      <FilterComponent open={open} setOpen={setOpen} />
    </Stack>
  );
}
