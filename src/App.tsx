
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InteractiveMap from './pages/InteractiveMap';
import DataIntegration from './pages/DataIntegration';
import DatasetManagement from './pages/DatasetManagement';
import ProjectDetails from './pages/ProjectDetails';
import ProtectedRoute from './components/ProtectedRoute';
import NextSteps from './pages/NextSteps';
import Upgrade from './pages/Upgrade';
import AboutUs from './pages/AboutUs';
import Documentation from './pages/Documentation';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import GlobalDataIntegration from './pages/GlobalDataIntegration';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Index from './pages/Index';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/interactive-map" element={<InteractiveMap />} />
              <Route path="/data-integration" element={<DataIntegration />} />
              <Route path="/dataset-management" element={<DatasetManagement />} />
              <Route path="/global-data-integration" element={<GlobalDataIntegration />} /> 
              <Route path="/project/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
              <Route path="/next-steps" element={<ProtectedRoute><NextSteps /></ProtectedRoute>} />
              <Route path="/upgrade" element={<Upgrade />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
