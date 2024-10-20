import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import App from '@/App';
import { UserProvider } from '@/context/UserContext/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@mantine/core/styles.css';
import './index.css';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
const theme = createTheme({
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
