
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetails from "./pages/ProjectDetails";
import NextSteps from "./pages/NextSteps";
import DataIntegration from "./pages/DataIntegration";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Upgrade from "./pages/Upgrade";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import AboutUs from "./pages/AboutUs";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SubscriptionBanner from "./components/SubscriptionBanner";
import Header from "./components/Header";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [currentDomain, setCurrentDomain] = useState<string>("");
  
  useEffect(() => {
    // Get current domain for routing logic
    const domain = window.location.hostname;
    setCurrentDomain(domain);
  }, []);
  
  // Check if we're on the geo-miner.com domain
  const isGeominerDomain = currentDomain === "geo-miner.com" || currentDomain === "www.geo-miner.com";
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <div className="flex flex-col min-h-screen">
              {!isGeominerDomain && <Header />}
              {!isGeominerDomain && <SubscriptionBanner />}
              
              <div className="flex-grow">
                <Routes>
                  {/* Landing page routes */}
                  {isGeominerDomain ? (
                    <>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </>
                  ) : (
                    <>
                      {/* Public routes */}
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/upgrade" element={<Upgrade />} />
                      <Route path="/about" element={<AboutUs />} />
                      
                      {/* Protected routes */}
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <Index />
                        </ProtectedRoute>
                      } />
                      <Route path="/project-details" element={
                        <ProtectedRoute>
                          <ProjectDetails />
                        </ProtectedRoute>
                      } />
                      <Route path="/next-steps" element={
                        <ProtectedRoute allowedRoles={['admin', 'geologist', 'drill-team']}>
                          <NextSteps />
                        </ProtectedRoute>
                      } />
                      <Route path="/data-integration" element={
                        <ProtectedRoute 
                          requireSubscription={true} 
                          allowedRoles={['admin', 'geologist', 'remote-sensing', 'academic']}
                        >
                          <DataIntegration />
                        </ProtectedRoute>
                      } />
                      
                      {/* Admin Dashboard */}
                      <Route path="/admin" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } />
                      
                      {/* Catch-all route */}
                      <Route path="*" element={<NotFound />} />
                    </>
                  )}
                </Routes>
              </div>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
