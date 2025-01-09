import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import picture from '../assets/NY.jpg';
import Header from '../components/Header';
import { RootState } from '../state/store';
import { TaskList } from '../components/TaskList';

const Home: React.FC = () => {
  const lists = useSelector((state: RootState) => state.lists.lists);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${picture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            padding: 2,
          }}
        >
          {lists.map((list) => (
            <TaskList key={list.id} listId={list.id} listName={list.name} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
