
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/base.css';
import './styles/touch.css';
import './styles/visualizations.css';
import './styles/minerals.css';
import './styles/charts.css';
import './styles/theme.css';
import './styles/navigation.css';
import './styles/responsive.css';
import './styles/z-index.css';
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
