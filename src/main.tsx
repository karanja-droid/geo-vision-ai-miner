
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/base.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth'
import './i18n' // Import i18n configuration
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppWrapper from './components/AppWrapper.tsx'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppWrapper>
            <App />
          </AppWrapper>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
