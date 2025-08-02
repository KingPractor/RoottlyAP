import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Add support for Web Bluetooth API
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Check for Bluetooth support
if ('bluetooth' in navigator) {
  console.log('Web Bluetooth is supported');
} else {
  console.warn('Web Bluetooth is not supported in this browser');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);