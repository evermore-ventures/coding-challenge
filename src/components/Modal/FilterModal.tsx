import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  Button,
  IconButton,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { closeModal } from '../../state/slices/modalSlice';
import { setFilterState, setFilterPriority } from '../../state/slices/taskSlice';

interface FilterModalProps {
  open: boolean;
  listId: string;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ listId, open, onClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Get current filters from Redux
  const filters = useSelector(
    (state: RootState) =>
      state.tasks.filters[listId] || {
        filterState: 'All',
        filterPriority: 'All',
      }
  );

  const [filterState, setFilterStateValue] = React.useState(filters.filterState);
  const [filterPriority, setFilterPriorityValue] = React.useState(filters.filterPriority);

  // Update local state when the modal opens
  useEffect(() => {
    if (open) {
      setFilterStateValue(filters.filterState);
      setFilterPriorityValue(filters.filterPriority);
    }
  }, [open, filters]);

  const handleApplyFilters = () => {
    dispatch(setFilterState({ listId, filterState }));
    dispatch(setFilterPriority({ listId, filterPriority }));
    dispatch(closeModal('filterModal'));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 3,
        },
      }}
    >
      {/* Title with Close Icon */}
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 1,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
          Filters
        </Typography>
        <IconButton
          onClick={() => dispatch(closeModal('filterModal'))}
          sx={{
            color: theme.palette.common.white,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          paddingTop: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Filter by State */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              fontSize: '0.9rem',
              marginBottom: 0.5,
              color: theme.palette.text.secondary,
            }}
          >
            State
          </Typography>
          <Select
            value={filterState}
            onChange={(e) => setFilterStateValue(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: theme.palette.background.default,
              borderRadius: 1,
              '& .MuiSelect-select': { padding: '10px 14px' },
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            }}
          >
            <MenuItem value="All">All States</MenuItem>
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </Box>

        {/* Filter by Priority */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              fontSize: '0.9rem',
              marginBottom: 0.5,
              color: theme.palette.text.secondary,
            }}
          >
            Priority
          </Typography>
          <Select
            value={filterPriority}
            onChange={(e) => setFilterPriorityValue(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: theme.palette.background.default,
              borderRadius: 1,
              '& .MuiSelect-select': { padding: '10px 14px' },
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            }}
          >
            <MenuItem value="All">All Priorities</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </Box>
      </DialogContent>

      <Box
        sx={{
          padding: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          onClick={handleApplyFilters}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            backgroundColor: theme.palette.primary.main,
            '&:hover': { backgroundColor: theme.palette.primary.dark },
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Dialog>
  );
};

export default FilterModal;
