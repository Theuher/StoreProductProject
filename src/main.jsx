import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store';


const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
      <App />
  </StrictMode>
);
