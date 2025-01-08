import { Button, capitalize, Card, CardHeader, Stack, Typography } from '@mui/material';
import { RootState, useAppDispatch, useAppSelector } from '../state/store';
import { todoAction } from '../types';
import { proceedTask } from '../state/todosSlice';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const stateColorMapping: Record<
  string,
  'error' | 'warning' | 'success' | 'inherit' | 'primary' | 'secondary' | 'info'
> = {
  todo: 'error',
  in_progress: 'warning',
  done: 'success',
};
const priorityColorMapping: Record<string, string> = {
  high: 'red',
  medium: 'orange',
  low: 'green',
};

const priorityValueMapping: Record<string, number> = {
  high: 1,
  medium: 2,
  low: 3,
};
export function TaskList({
  setOpen,
  setSelectedTodo,
  setDeleteOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setDeleteOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedTodo: Dispatch<SetStateAction<todoAction | undefined>>;
}) {
  const Todos = useAppSelector((state: RootState) => state.todos.todos);
  const [filteredSortedTodos, setFilteredSortedTodos] = useState(Todos);
  const Filter = useAppSelector((state: RootState) => state.filter.filter);
  const SelectedPurpose = useAppSelector((state: RootState) => state.todos.selectedPurpose);
  const Sort = useAppSelector((state: RootState) => state.filter.sort);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let tempTodos = [...Todos];
    if (Filter.Priority !== undefined) {
      tempTodos = tempTodos.filter((todo) => todo.priority == Filter.Priority);
    }
    if (Filter.State !== undefined) {
      tempTodos = tempTodos.filter((todo) => todo.state == Filter.State);
    }

    if (Sort.Priority !== undefined) {
      if (Sort.Priority == 'high')
        tempTodos.sort(
          (a, b) => priorityValueMapping[a.priority] - priorityValueMapping[b.priority]
        );
      else if (Sort.Priority == 'low')
        tempTodos.sort(
          (a, b) => priorityValueMapping[b.priority] - priorityValueMapping[a.priority]
        );
    }
    if (SelectedPurpose) {
      tempTodos = tempTodos.filter((todo) => todo.purpose == SelectedPurpose);
    }

    setFilteredSortedTodos(tempTodos);
  }, [Todos, Filter, Sort, SelectedPurpose]);

  return (
    <Stack
      direction={'column'}
      spacing={2}
      sx={{ height: 'calc(100vh - 100px)', overflow: 'scroll' }}
    >
      {filteredSortedTodos?.map((todoItem: todoAction) => {
        return (
          <Card key={todoItem.id} sx={{ px: 4, py: 2, overflow: 'visible' }} elevation={0}>
            <CardHeader
              title={todoItem.name}
              action={
                <Stack direction={'row'}>
                  <Button
                    color="error"
                    onClick={() => {
                      setSelectedTodo(todoItem);
                      setDeleteOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedTodo(todoItem);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </Stack>
              }
            />

            <Stack
              spacing={1}
              alignItems={'center'}
              direction={'row'}
              justifyContent={'space-between'}
            >
              <Stack
                spacing={1}
                alignItems={'center'}
                direction={'row'}
                justifyContent={'space-between'}
              >
                <Typography variant="subtitle2">Priority</Typography>
                <Typography color={priorityColorMapping[todoItem.priority]} variant="subtitle2">
                  {capitalize(todoItem.priority)}
                </Typography>
              </Stack>
              <Stack
                spacing={1}
                alignItems={'center'}
                direction={'row'}
                justifyContent={'space-between'}
              >
                <Typography variant="subtitle2"> State </Typography>
                <Button
                  variant="text"
                  disabled={todoItem.state == 'done'}
                  color={stateColorMapping[todoItem.state]}
                  sx={{ p: 0 }}
                  onClick={() => dispatch(proceedTask(todoItem.id))}
                >
                  <Typography variant="subtitle2">{todoItem.state}</Typography>
                </Button>
              </Stack>
            </Stack>
          </Card>
        );
      })}
      {Todos.length == 0 && <Typography>All done!</Typography>}
    </Stack>
  );
}
