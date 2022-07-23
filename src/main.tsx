import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './apps/App';
import { RouterProvider, AppThemeProvider } from '@/shared/context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </AppThemeProvider>
  </React.StrictMode>,
);
