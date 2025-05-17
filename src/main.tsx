
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/base.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth'
import './i18n' // Import i18n configuration

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
