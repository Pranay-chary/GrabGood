import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './components/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Surplus from './pages/Surplus';
import Bookings from './pages/Bookings';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import NotificationsPage from './pages/NotificationsPage';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Listings from './pages/Listings';
import AddListing from './pages/AddListing';
import EditListing from './pages/EditListing';

// Business Category Management Pages
import HallManagement from './pages/HallManagement';
import RestaurantManagement from './pages/RestaurantManagement';
import HotelManagement from './pages/HotelManagement';
import SweetShopManagement from './pages/SweetShopManagement';

// New Business Registration Pages
import BusinessTypeSelection from './pages/BusinessTypeSelection';
import BusinessRegistration from './pages/BusinessRegistration';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/surplus"
            element={
              <ProtectedRoute>
                <Surplus />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-details/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/listings"
            element={
              <ProtectedRoute>
                <Listings />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/add-listing"
            element={
              <ProtectedRoute>
                <AddListing />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/edit-listing/:listingId"
            element={
              <ProtectedRoute>
                <EditListing />
              </ProtectedRoute>
            }
          />
          
          {/* Business Category Management Routes */}
          <Route
            path="/hall-management"
            element={
              <ProtectedRoute>
                <HallManagement />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/restaurant-management"
            element={
              <ProtectedRoute>
                <RestaurantManagement />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/hotel-management"
            element={
              <ProtectedRoute>
                <HotelManagement />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/sweet-shop-management"
            element={
              <ProtectedRoute>
                <SweetShopManagement />
              </ProtectedRoute>
            }
          />
          
          {/* New Business Registration Routes */}
          <Route
            path="/business-type-selection"
            element={
              <ProtectedRoute>
                <BusinessTypeSelection />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/business-registration/:businessType"
            element={
              <ProtectedRoute>
                <BusinessRegistration />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
