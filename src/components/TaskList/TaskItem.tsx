import React from 'react';
import { Box, IconButton, Tooltip, Typography, Chip, useTheme } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Task } from '../../types';

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onChangeState: () => void;
}

const TaskItem: React.FC<Props> = ({ task, onEdit, onDelete, onChangeState }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2,
        borderRadius: 2,
        gap: 2,
        backgroundColor: theme.palette.background.default,
        boxShadow: 1,
        mb: 1,
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      {/* State and Priority Labels Side by Side */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* State (clickable chip) */}
        <Tooltip title={`State: ${task.state}`} arrow>
          <Chip
            label={task.state.charAt(0).toUpperCase() + task.state.slice(1).replace('_', ' ')} // Capitalize and replace underscores
            onClick={onChangeState}
            size="small"
            sx={{
              cursor: 'pointer',
              height: 20,
              fontSize: '0.75rem',
              backgroundColor:
                task.state === 'done'
                  ? theme.palette.state.done
                  : task.state === 'in_progress'
                  ? theme.palette.state.in_progress
                  : theme.palette.state.todo,
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor:
                  task.state === 'done'
                    ? theme.palette.state.done
                    : task.state === 'in_progress'
                    ? theme.palette.state.in_progress
                    : theme.palette.state.todo,
                opacity: 1, // Ensure opacity remains consistent
              },
            }}
          />
        </Tooltip>

        {/* Priority Label with Tooltip */}
        <Tooltip title={`Priority: ${task.priority}`} arrow>
          <Chip
            label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.75rem',
              backgroundColor: theme.palette.priority[task.priority],
              color: '#fff',
              fontWeight: 'bold',
            }}
          />
        </Tooltip>
      </Box>

      {/* Task Details and Action Icons Side by Side */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        {/* Task Name */}
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ flexGrow: 1, fontSize: '14px', color: theme.palette.text.primary }}
        >
          {task.name}
        </Typography>

        {/* Action Icons */}
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Edit Task" arrow>
            <IconButton onClick={onEdit} color="primary">
              <CreateOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Task" arrow>
            <IconButton onClick={onDelete} color="primary">
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskItem;
