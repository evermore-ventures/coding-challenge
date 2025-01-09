import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Box,
  useTheme,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import useCreateEditTask from '../../hooks/useCreateEditTask';
import { PRIORITIES } from '../../utils/constants';
import { Task } from '../../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task;
}

const CreateEditTaskModal: React.FC<Props> = ({ open, onClose, onSave, task }) => {
  const theme = useTheme();
  const { name, priority, setName, setPriority, resetForm } = useCreateEditTask({ task });

  const handleSubmit = () => {
    onSave({
      ...task,
      id: task?.id ?? Date.now(),
      name,
      priority,
      state: task?.state || 'todo',
      listId: task?.listId || '',
    });
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          backgroundColor: 'rgba(16, 18, 4, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              {task ? 'Edit Task' : 'Create Task'}
            </Typography>
            <IconButton onClick={onClose} sx={{ color: theme.palette.text.primary }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ my: 2 }}
          />
          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            fullWidth
            sx={{ mb: 3 }}
          >
            {PRIORITIES.map((p) => (
              <MenuItem key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={task ? <EditOutlinedIcon /> : <AddOutlinedIcon />}
              onClick={handleSubmit}
              sx={{
                textTransform: 'none',
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {task ? 'Edit' : 'Create'}
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default CreateEditTaskModal;
