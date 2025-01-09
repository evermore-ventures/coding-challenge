import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (listName: string) => void;
}

const NewListModal: React.FC<Props> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave(name);
    setName('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
        }}
      >
        <h2>Create New List</h2>
        <TextField
          label="List Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <Button onClick={handleSubmit}>Create</Button>
      </Box>
    </Modal>
  );
};

export default NewListModal;
