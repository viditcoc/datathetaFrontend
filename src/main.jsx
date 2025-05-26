import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setupWorker } from 'msw/browser';
import { handlers } from './mocks/handlers';


if (process.env.NODE_ENV === 'development') {
  const worker = setupWorker(...handlers);
  worker.start({
    onUnhandledRequest: 'bypass', // Ignore unhandled requests (e.g., Vite's own requests)
  }).catch(error => {
    console.error('Failed to start MSW worker:', error);
  });
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
