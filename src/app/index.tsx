import { Container, Card, CssBaseline, Typography, Stack, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { TaskList } from './taskList';
import { CreateEditTask } from './createEditTask';
import { useState } from 'react';
import { todoAction } from '../types';
import { SortComponent } from './sortComponent';
import { ConfirmModal } from './confirmationModal';
import { useAppDispatch } from '../state/store';
import { createPurpose, deleteTask, setSelectedPurpose } from '../state/todosSlice';
import { CreateNewList } from './createNewList';

function App() {
  const [createEditOpen, setCreateEditOpen] = useState(false);
  const [createListOpen, setCreateListOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [selectedTodo, setSelectedTodo] = useState<todoAction | undefined>(undefined);
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          height: '100vh',
          background: grey[200],
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Card sx={{ p: 4, mb: 2 }}>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography variant="subtitle2">Evermore Coding Challenge</Typography>
            <SortComponent />
            <Button onClick={() => setCreateEditOpen(true)}>Create Task</Button>
            <Button onClick={() => setCreateListOpen(true)}>Create List</Button>
          </Stack>
        </Card>

        <TaskList
          setSelectedTodo={setSelectedTodo}
          setOpen={setCreateEditOpen}
          setDeleteOpen={setDeleteOpen}
        />
        <CreateEditTask
          open={createEditOpen}
          setSelectedTodo={setSelectedTodo}
          setOpen={setCreateEditOpen}
          todoItem={selectedTodo}
        />
        <ConfirmModal
          setSelectedTodo={setSelectedTodo}
          todo={selectedTodo}
          open={deleteOpen}
          setOpen={setDeleteOpen}
          confirmCallback={() => {
            if (selectedTodo) {
              dispatch(deleteTask(selectedTodo?.id));
              setDeleteOpen(false);
              setSelectedTodo(undefined);
            }
          }}
        />
        <CreateNewList
          open={createListOpen}
          setOpen={setCreateListOpen}
          confirmCallback={(listName: string) => {
            dispatch(createPurpose(listName));
            dispatch(setSelectedPurpose(listName));
          }}
        />
      </Container>
    </>
  );
}

export default App;
