import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      dark: '#282F27',
    },
    priority: {
      low: '#bdbdbd',
      medium: '#ff9800',
      high: '#f44336',
    },
    state: {
      todo: '#64b5f6',
      in_progress: '#ffb74d',
      done: '#81c784',
    },
    background: {
      default: '#22272B',
      paper: '#101204',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#2b2b2b',
          color: '#ffffff',
        },
      },
    },
  },
});

export default theme;
