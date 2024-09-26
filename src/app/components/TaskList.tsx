// TaskList.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import TaskItem from './TaskItem';
import SortAndFilterControls from './SortAndFilterControls';
import AddTaskModal from './AddTaskModal';
import { Button } from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  .controls {
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
    align-items: center;

    .add-task {
      width: 8em;
      padding: 0.5em;
      height: 2.5em;
    }
  }
`;

const TaskList = () => {
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  
  const { tasks, filterByState, currentList, isAscending } = useSelector((state: RootState) => state.todos);

  // const filteredTasks = tasks
  //   .filter(task => filterByState === 'all' || task.state === filterByState)
    // .filter(task => task.list === currentList);

  const filteredTasks = tasks
  .filter(task => {
    if (filterByState === 'select') {
        return task.state !== 'done'; // Exclude done tasks
    }
    return filterByState === 'all' || task.state === filterByState; // Include based on selected state
  })
  .filter(task => task.list === currentList)
  .sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };

    const comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
    return isAscending ? comparison : -comparison; // Reverse the comparison if not ascending
  });

  console.log('isAscending', isAscending);
  
  return (
    <StyledDiv>
      <div className='controls'>

        <Button className='add-task' variant="contained" onClick={() => setAddTaskOpen(true)}>
          Add Task
        </Button>

        <SortAndFilterControls />
      </div>
      {filteredTasks.length === 0 ? (
        <p>No tasks available for the selected criteria.</p>
      ) : (
        filteredTasks.map(task => <TaskItem key={task.id} task={task} />)
      )}
      <AddTaskModal open={addTaskOpen} handleClose={() => setAddTaskOpen(false)} />
    </StyledDiv>
  );
};

export default TaskList;
