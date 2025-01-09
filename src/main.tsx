import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider as ReduxProvider } from 'react-redux';

import App from './app/index.tsx';
import './index.css';
import { persistor, store } from './state/store.ts';
import ModalManager from './components/Modal/ModalManager.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './types/theme.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <ModalManager />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  </StrictMode>
);
