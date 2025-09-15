import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Find the root element in index.html
const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

// Render the app in strict mode
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
