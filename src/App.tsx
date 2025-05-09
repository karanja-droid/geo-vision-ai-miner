
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderWithLanguage from './components/HeaderWithLanguage';
import Footer from './components/Footer';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import UserProfile from './pages/UserProfile';
import DatasetManagement from './pages/DatasetManagement';
import Documentation from './pages/Documentation';
import InteractiveMap from './pages/InteractiveMap';
import DataIntegration from './pages/DataIntegration';
import ProjectDetails from './pages/ProjectDetails';
import NextSteps from './pages/NextSteps';
import GlobalDataIntegration from './pages/GlobalDataIntegration';
import Upgrade from './pages/Upgrade';
import NotFound from './pages/NotFound';
import SatelliteVisionDemo from './pages/SatelliteVisionDemo';
import GeoStructure3DDemo from './pages/GeoStructure3DDemo';
import ProductRoadmap from './pages/ProductRoadmap';
import GisShapefileManagement from './pages/GisShapefileManagement';
import MinesExplorer from './pages/MinesExplorer';
import SubscriptionBanner from './components/SubscriptionBanner';
import { MinesProvider } from './contexts/MinesContext';

function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <MinesProvider>
        <div className="App flex flex-col min-h-screen max-w-[100vw] overflow-x-hidden">
          <HeaderWithLanguage />
          <SubscriptionBanner />
          <div className="flex-1 px-2 sm:px-4 w-full">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/dataset-management" element={<DatasetManagement />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/interactive-map" element={<InteractiveMap />} />
              <Route path="/data-integration" element={<DataIntegration />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/next-steps" element={<NextSteps />} />
              <Route path="/global-data-integration" element={<GlobalDataIntegration />} />
              <Route path="/upgrade" element={<Upgrade />} />
              <Route path="/satellite-vision" element={<SatelliteVisionDemo />} />
              <Route path="/geostructure-3d" element={<GeoStructure3DDemo />} />
              <Route path="/product-roadmap" element={<ProductRoadmap />} />
              <Route path="/gis-shapefile" element={<GisShapefileManagement />} />
              <Route path="/mines-explorer" element={<MinesExplorer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </MinesProvider>
    </Suspense>
  );
}

export default App;
