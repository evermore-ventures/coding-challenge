import React, { useMemo, useState } from 'react';
import {
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  IconButton,
} from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { useAppSelector, useAppDispatch } from '../state/store';
import TaskList from '../components/taskList';
import TaskFormModal from '../components/taskFormModal';
import { addTask, addTaskList } from '../state/tasksSlice';
import { SortAndFilterState, TaskPriority } from '../types';
import AppContainer from '../components/appContainer';
import { SORT_OPTIONS, FILTER_OPTIONS } from '../constants';
import TaskListFormModal from '../components/taskListFormModal';
import {
  setSelectedTaskList,
  updateFilterOption,
  updateSortOption,
} from '../state/sortAndFilterSlice';
import { seedData } from '../seed';

const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const taskLists = useAppSelector((state) => state.tasks.taskLists);
  const { filterOption, sortOption, selectedTaskListId } = useAppSelector(
    (state) => state.sortAndFilter
  );

  const [isTaskModelOpen, setIsTaskModelOpen] = useState(false);
  const [isTaskListModelOpen, setIsTaskListModelOpen] = useState(false);

  const taskList = useMemo(() => {
    return taskLists.find((task) => task.id === selectedTaskListId) || taskLists[0];
  }, [taskLists, selectedTaskListId]);

  // Filter "all", shows all tasks except done tasks
  const sortedAndFilteredTasks = useMemo(() => {
    return taskList?.tasks
      .filter((task) => {
        if (filterOption === 'all') {
          return task.state !== 'done';
        }

        return task.state === filterOption;
      })
      .sort((a, b) => {
        if (sortOption === 'priority') {
          const priorityOrder = { low: 1, medium: 2, high: 3 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }

        // Default sorting by state if sortOption is not 'priority'
        return a.state.localeCompare(b.state);
      });
  }, [taskList, filterOption, sortOption]);

  const handleAddTask = (name: string, priority: TaskPriority) => {
    dispatch(
      addTask({
        listId: selectedTaskListId,
        task: { id: Date.now(), name, state: 'todo', priority },
      })
    );
  };

  const handleAddTaskList = (taskListName: string) => {
    dispatch(addTaskList({ id: Date.now(), taskListName }));
  };

  return (
    <AppContainer>
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <Typography sx={{ fontSize: 36 }} variant="h2">
          Tasks
        </Typography>

        <Button variant="contained" size="small" onClick={() => setIsTaskModelOpen(true)}>
          + New Task
        </Button>
      </Box>
      <Button
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        variant="outlined"
        size="small"
        onClick={seedData}
      >
        Seed Data
      </Button>
      <Box sx={{ display: 'flex', gap: 2, marginTop: 2, marginBottom: 2 }}>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => {
              dispatch(
                updateSortOption({ option: e.target.value as SortAndFilterState['sortOption'] })
              );
            }}
            label="Sort By"
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }} size="small">
          <InputLabel>Filter By</InputLabel>
          <Select
            value={filterOption}
            onChange={(e) => {
              dispatch(
                updateFilterOption({ option: e.target.value as SortAndFilterState['filterOption'] })
              );
            }}
            label="Filter By"
          >
            {FILTER_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }} size="small">
          <InputLabel>Task List</InputLabel>
          <Select
            value={taskList.id}
            onChange={(e) => {
              const taskList = taskLists.find((task) => task.id === Number(e.target.value));
              if (taskList) dispatch(setSelectedTaskList({ option: taskList.id }));
            }}
            label="Task List"
          >
            {taskLists.map((taskList) => (
              <MenuItem key={taskList.id} value={taskList.id}>
                {taskList.taskListName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Tooltip title="Add task list" placement="top-start">
          <IconButton size="large" aria-label="add" onClick={() => setIsTaskListModelOpen(true)}>
            <AddOutlined />
          </IconButton>
        </Tooltip>
      </Box>

      <TaskList taskList={{ ...taskList, tasks: sortedAndFilteredTasks || [] }} />

      <TaskFormModal
        open={isTaskModelOpen}
        onClose={() => setIsTaskModelOpen(false)}
        onSubmit={handleAddTask}
      />

      <TaskListFormModal
        open={isTaskListModelOpen}
        onClose={() => setIsTaskListModelOpen(false)}
        onSubmit={handleAddTaskList}
      />
    </AppContainer>
  );
};

export default TasksPage;
