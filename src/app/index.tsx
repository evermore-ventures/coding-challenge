import {CssBaseline, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import { TaskProvider } from './components/TaskContext';




function App() {
  

  return (
    <>
      <CssBaseline />
      <TaskProvider>
        <Box
         sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        >
          <Box
            sx={{
              padding: '16px',
              backgroundColor: '#fff',
              boxShadow: 1,
              position: 'sticky',
              top: 0,
            }}
          >
            <CreateTask />
          </Box>
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
            }}
          >
            <TaskList />
          </Box>
       </Box>
      </TaskProvider>
    </>
  );
}

export default App;
