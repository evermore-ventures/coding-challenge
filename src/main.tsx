import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import store from './state/store';
import App from './app/index.tsx';
import Todo from './app/todo/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename="">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/todo/:slug" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
