import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlined from '@mui/icons-material/EditOutlined';

import ConfirmDialog from './confirmDialog';
import AddTaskModal from './taskFormModal';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onStateChange: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = (props) => {
  const { task, onDelete, onStateChange, onEdit } = props;

  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <>
      <ListItem secondaryAction={<></>} disableGutters>
        <ListItemText primary={task.name} secondary={`[${task.priority}]`} />
        <Button
          variant="outlined"
          size="small"
          disabled={task.state === 'done'}
          onClick={() => onStateChange(task.id)}
        >
          {task.state}
        </Button>
        <IconButton
          disabled={task.state === 'done'}
          onClick={() => setOpenEditModal(true)}
          edge="end"
          aria-label="edit"
          sx={{ marginRight: '4px', marginLeft: '14px' }}
        >
          <EditOutlined />
        </IconButton>
        <IconButton onClick={() => setOpen(true)} edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItem>

      <ConfirmDialog
        title="Delete task"
        description="Are you sure you want to delete this task?"
        open={open}
        setOpen={setOpen}
        onConfirm={() => onDelete(task.id)}
      />

      {openEditModal && (
        <AddTaskModal
          defaultState={{ taskName: task.name, priority: task.priority }}
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          onSubmit={(name, priority) => onEdit({ ...task, name, priority })}
        />
      )}
    </>
  );
};

export default TaskItem;
