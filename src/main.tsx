
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './styles/map.css';
import { AuthProvider } from './contexts/AuthContext';
import { ConnectivityProvider } from './contexts/ConnectivityContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ConnectivityProvider>
          <App />
        </ConnectivityProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
