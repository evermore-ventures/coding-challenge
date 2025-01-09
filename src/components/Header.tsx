import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { addList } from '../state/slices/listSlice';
import { NewListModal } from './Modal';

const Header: React.FC = () => {
  const [isNewListModalOpen, setNewListModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSave = (name: string) => {
    dispatch(addList({ id: uuid(), name }));
    setNewListModalOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'rgba(43, 43, 43, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#ffffff',
              fontWeight: 'bold',
            }}
          >
            Evermore Todo App
          </Typography>
          <Button
            onClick={() => setNewListModalOpen(true)}
            sx={{
              backgroundColor: '#5aac44',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: 2,
              textTransform: 'none',
              padding: '6px 12px',
              '&:hover': {
                backgroundColor: '#519839',
              },
            }}
          >
            + New List
          </Button>
        </Toolbar>
      </AppBar>
      <NewListModal
        open={isNewListModalOpen}
        onClose={() => setNewListModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default Header;
