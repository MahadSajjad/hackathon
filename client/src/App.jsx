import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CampaignDetails from './pages/CampaignDetails';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DonorDashboard from './pages/Frontend/Dashboard/DashboardDonor';
import NGODashboard from './pages/Frontend/Dashboard/DashboardNGO';

// Private Route Component
const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Private Routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute requiredRole="donor">
                <DonorDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/ngo-dashboard" 
            element={
              <PrivateRoute requiredRole="ngo">
                <NGODashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
