import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Load original scripts after React mounts
const loadScripts = () => {
  const scripts = [
    '/js/jquery.js',
    '/js/popper.min.js',
    '/js/bootstrap.min.js',
    '/js/jquery.mCustomScrollbar.concat.min.js',
    '/js/jquery.fancybox.js',
    '/js/appear.js',
    '/js/owl.js',
    '/js/wow.js',
    '/js/jquery-ui.js',
    '/js/script.js',
  ];

  scripts.forEach((src) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
  });
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// Load scripts after initial render
setTimeout(loadScripts, 100);
