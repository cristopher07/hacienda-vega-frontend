import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3} // máximo de notificaciones visibles a la vez
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // posición por defecto
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

// Métricas opcionales
reportWebVitals();
