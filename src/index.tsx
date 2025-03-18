import React from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot
import './index.css';
import App from './App';
import 'material-icons/iconfont/material-icons.css';

// Get the root DOM element
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Create a React root and render the app
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);