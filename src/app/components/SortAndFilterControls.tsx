// SortAndFilterControls.tsx
import { useAppDispatch, useAppSelector } from '../../state/store';
import { filterTasks, sortTasks } from '../../state/todosSlice';
import { Button, Select, MenuItem } from '@mui/material';
import styled from '@emotion/styled';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  aligh-items: center;

  .filter {
    height: 2.5em;
  }
`;

// filter deafult case no value is selected
const SortAndFilterControls = () => {
  const dispatch = useAppDispatch();

  const { filterByState } = useAppSelector((state) => state.todos);

  const handleFilter = (e: any) => {
    dispatch(filterTasks(e.target.value));
  };

  const handleSort = () => {
    dispatch(sortTasks());
  };

  return (
    <StyledDiv>
      <Select className="filter" defaultValue={filterByState} onChange={handleFilter}>
        <MenuItem disabled={true} value='select'>Select</MenuItem>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="todo">To Do</MenuItem>
        <MenuItem value="in_progress">In Progress</MenuItem>
        <MenuItem value="done">Done</MenuItem>
      </Select>
      <Button onClick={handleSort}>Sort by Priority</Button>
    </StyledDiv>
  );
};

export default SortAndFilterControls;
