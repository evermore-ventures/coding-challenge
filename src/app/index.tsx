import { useState } from 'react';
import { Container, CssBaseline, Button, Select, MenuItem } from '@mui/material';
import styled from '@emotion/styled'
import TaskList from './components/TaskList';
import AddTaskListModal from './components/AddTaskListModal';
import { useAppDispatch, useAppSelector } from '../state/store';
import { selectTaskList } from '../state/todosSlice';

const StyledDiv = styled.div`
  .task-list-controls {
    display: flex;

    .task-lists {
      margin-left: 1em;
      height: 2.5em;
    }
  }
`;

function App() {
  const dispatch = useAppDispatch();
  const { currentList, lists } = useAppSelector((state) => state.todos);
  const [addListOpen, setAddListOpen] = useState(false);

  const handleListChange = (e: any) => {
    dispatch(selectTaskList(e.target.value));
  };

  return (
    <>
      <CssBaseline />

      <Container
        maxWidth={'md'}
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '50em',
          padding: '1em',
        }}
      >
        <StyledDiv>
        <h1 style={{ textAlign: 'center' }}>Task Manager</h1>
        <div className='task-list-controls'>
          <Button
            style={{
              width: '13em',
            }}
            variant="outlined"
            onClick={() => setAddListOpen(true)}
          >
            Create New List
          </Button>
          <Select className="task-lists" defaultValue={currentList} onChange={handleListChange}>
            {/* <MenuItem value="default">Default</MenuItem> */}
            {lists.map((list) => (
              <MenuItem key={list} value={list}>
                {list}
              </MenuItem>
            ))}
          </Select>
        </div>
        <TaskList />

        <AddTaskListModal open={addListOpen} handleClose={() => setAddListOpen(false)} />
          
        </StyledDiv>
      </Container>
    </>
  );
}

export default App;
