import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';
import { setFilterPriority, setFilterState } from '../state/slices/taskSlice';
import { sortTasks } from '../utils/helpers';
import { useState } from 'react';

export const useTaskList = (listId: string) => {
  const dispatch = useDispatch();

  const [sortEnabled, setSortEnabled] = useState(false);

  const tasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter((task) => task.listId === listId)
  );

  const filterState = useSelector(
    (state: RootState) => state.tasks.filters[listId]?.filterState || 'All'
  );
  const filterPriority = useSelector(
    (state: RootState) => state.tasks.filters[listId]?.filterPriority || 'All'
  );

  const handleFilterStateChange = (filterState: string) => {
    dispatch(setFilterState({ listId, filterState }));
  };
  const handleFilterPriorityChange = (filterPriority: string) => {
    dispatch(setFilterPriority({ listId, filterPriority }));
  };

  const handleSortToggle = () => {
    setSortEnabled((prev) => !prev);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterState !== 'All' && task.state.toLowerCase() !== filterState.toLowerCase()) {
      return false;
    }

    if (filterPriority !== 'All' && task.priority.toLowerCase() !== filterPriority.toLowerCase()) {
      return false;
    }
    return true;
  });

  //sort
  const finalTasks = sortEnabled ? sortTasks(filteredTasks) : filteredTasks;

  return {
    tasks: finalTasks,
    filterState,
    filterPriority,
    sortEnabled,
    handleFilterStateChange,
    handleFilterPriorityChange,
    handleSortToggle,
  };
};
