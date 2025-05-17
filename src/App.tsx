import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Dashboard from './pages/Dashboard';
import DatasetManagement from './pages/DatasetManagement';
import InteractiveMap from './pages/InteractiveMap';
import Header from './components/Header';
import Footer from './components/Footer';

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
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="min-h-screen bg-background">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dataset-management" element={<DatasetManagement />} />
            <Route path="/interactive-map" element={<InteractiveMap />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
          <Footer />
        </div>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
