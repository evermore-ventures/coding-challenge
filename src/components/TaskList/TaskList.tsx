import React from 'react';
import { Box, Typography, Paper, Tooltip, IconButton, Button, TextField } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useTaskList } from '../../hooks/useTaskList';
import TaskItem from './TaskItem';
import { changeTaskState } from '../../state/slices/taskSlice';
import { openModal } from '../../state/slices/modalSlice';
import { applyListName, setEditing, setEditName } from '../../state/slices/listSlice';
import { RootState } from '../../state/rootReducer';
import { Task } from '../../types';

interface TaskListProps {
  listId: string;
  listName: string;
}

const TaskList: React.FC<TaskListProps> = ({ listId, listName }) => {
  const dispatch = useDispatch();

  const { tasks, sortEnabled, handleSortToggle } = useTaskList(listId);

  const { isEditing, editName } = useSelector(
    (state: RootState) => state.lists.edits[listId] || { isEditing: false, editName: '' }
  );

  const handleEditToggle = () => {
    if (isEditing) {
      dispatch(applyListName({ listId }));
    } else {
      dispatch(setEditName({ listId, editName: listName }));
    }
    dispatch(setEditing({ listId, isEditing: !isEditing }));
  };

  const handleDeleteList = () => {
    dispatch(openModal({ key: 'deleteList', data: { type: 'deleteList', listId } }));
  };

  const handleCreateTask = () => {
    dispatch(openModal({ key: 'createTask', data: { type: 'createTask', listId } }));
  };

  const handleEditTask = (task: Task) => {
    dispatch(openModal({ key: 'editTask', data: { type: 'editTask', task } }));
  };

  const handleDeleteTask = (task: Task) => {
    dispatch(openModal({ key: 'deleteTask', data: { type: 'deleteTask', taskId: task.id } }));
  };

  return (
    <Paper
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 2,
        width: 284,
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        height: 'max-content',
        maxHeight: '80vh',
        color: theme.palette.text.primary,
      })}
    >
      {/* Title with Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        {isEditing ? (
          <TextField
            value={editName}
            onChange={(e) => dispatch(setEditName({ listId, editName: e.target.value }))}
            onBlur={handleEditToggle}
            autoFocus
            size="small"
            variant="outlined"
            inputProps={{
              style: {
                padding: 0,
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: '1.5',
              },
            }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                padding: 0,
                '& fieldset': { border: 'none' },
              },
            }}
          />
        ) : (
          <Typography
            variant="h6"
            component="h6"
            sx={{ fontSize: '16px', cursor: 'pointer', flexGrow: 1 }}
            onClick={handleEditToggle}
          >
            {listName}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0, mb: 2 }}>
          <Tooltip title={sortEnabled ? 'Sorting by Priority (High to Low)' : 'Sort by Priority'}>
            <IconButton
              onClick={handleSortToggle}
              sx={(theme) => ({
                color: sortEnabled ? theme.palette.error.main : theme.palette.warning.main,
              })}
            >
              {sortEnabled ? <NorthIcon fontSize="small" /> : <SouthIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter Tasks">
            <IconButton
              onClick={() =>
                dispatch(openModal({ key: 'filterModal', data: { type: 'filterModal', listId } }))
              }
              sx={(theme) => ({ color: theme.palette.text.primary })}
            >
              <FilterListIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete List">
            <IconButton onClick={handleDeleteList} sx={{ color: 'error.main' }}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Task List */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          marginBottom: 2,
          overflowY: tasks.length > 0 ? 'auto' : 'hidden',
          maxHeight: '100vh',
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '4px' },
          '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
        }}
      >
        {tasks.length ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => handleEditTask(task)}
              onDelete={() => handleDeleteTask(task)}
              onChangeState={() => dispatch(changeTaskState(task.id))}
            />
          ))
        ) : (
          <Typography variant="body2" sx={(theme) => ({ color: theme.palette.text.secondary })}>
            No tasks yet!
          </Typography>
        )}
      </Box>

      <Button
        variant="contained"
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'transparent',
          color: theme.palette.common.white,
          fontWeight: 'bold',
          textTransform: 'none',
          '&:hover': { backgroundColor: theme.palette.primary.dark },
        })}
        onClick={handleCreateTask}
      >
        <AddOutlinedIcon fontSize="small" />
        Add a task
      </Button>
    </Paper>
  );
};

export default TaskList;
