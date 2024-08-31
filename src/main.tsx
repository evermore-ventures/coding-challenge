import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import store from './state/store';
import TasksPage from './app/tasksPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename="">
        <Routes>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="*" element={<Navigate replace to="/tasks" />} />
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
