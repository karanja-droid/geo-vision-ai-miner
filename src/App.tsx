
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Dashboard from './pages/Dashboard';
import DatasetManagement from './pages/DatasetManagement';
import InteractiveMap from './pages/InteractiveMap';
import Analysis from './pages/Analysis';
import HeaderWithLanguage from './components/HeaderWithLanguage';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import SecurityPolicy from './pages/SecurityPolicy';
import ProtectedRoute from './components/ProtectedRoute';
import { Sidebar } from './components/navigation/Sidebar';
import { SidebarProvider, useSidebar } from './contexts/SidebarContext';
import AppWrapper from './components/AppWrapper';
import ProductRoadmapPage from './pages/ProductRoadmap';
import TabNavigation from './components/navigation/TabNavigation';

// Main application layout with sidebar
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isExpanded, toggleSidebar } = useSidebar();
  
  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={!isExpanded} toggleCollapse={toggleSidebar} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <HeaderWithLanguage />
        
        {/* Added TabNavigation here */}
        <div className="flex justify-center w-full bg-background pt-2">
          <TabNavigation />
        </div>
        
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SidebarProvider>
        <AppWrapper>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/security-policy" element={<SecurityPolicy />} />
            
            {/* Routes with Sidebar Layout */}
            <Route path="/" element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } />
            <Route path="/dataset-management" element={
              <AppLayout>
                <DatasetManagement />
              </AppLayout>
            } />
            <Route path="/interactive-map" element={
              <AppLayout>
                <InteractiveMap />
              </AppLayout>
            } />
            <Route path="/analysis" element={
              <AppLayout>
                <Analysis />
              </AppLayout>
            } />
            <Route path="/admin-dashboard" element={
              <AppLayout>
                <ProtectedRoute allowedRoles={['admin']} strictRoleCheck={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              </AppLayout>
            } />
            <Route path="/user-profile" element={
              <AppLayout>
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              </AppLayout>
            } />
            <Route path="/mines-explorer" element={
              <AppLayout>
                <ProtectedRoute>
                  {/* MinesExplorer component will be loaded here */}
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">Mines Explorer</h1>
                    <p>Explore global mining operations data</p>
                  </div>
                </ProtectedRoute>
              </AppLayout>
            } />
            <Route path="/product-roadmap" element={
              <AppLayout>
                <ProductRoadmapPage />
              </AppLayout>
            } />
            {/* Other routes would be added here */}
          </Routes>
        </AppWrapper>
      </SidebarProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
