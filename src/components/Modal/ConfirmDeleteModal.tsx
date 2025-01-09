import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box
        sx={{
          backgroundColor: 'rgba(16, 18, 4, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              Confirm Deletion
            </Typography>
            <IconButton onClick={onClose} sx={{ color: theme.palette.text.primary }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Are you sure you want to delete this list? This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteOutlinedIcon />}
            onClick={onConfirm}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              backgroundColor: theme.palette.error.main,
              '&:hover': {
                backgroundColor: theme.palette.error.dark,
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
