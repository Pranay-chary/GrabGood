import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { BookingManagement } from './components/BookingManagement';
import { Settings } from './components/Settings';
import { BusinessList } from './pages/BusinessList';
import { BusinessManagement } from './pages/BusinessManagement';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="businesses" element={<BusinessList />} />
      <Route path="business/add/:type" element={<BusinessManagement />} />
      <Route path="business/edit/:type/:id" element={<BusinessManagement />} />
      <Route path="bookings" element={<BookingManagement />} />
      <Route path="settings" element={<Settings />} />
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600">Page not found</p>
        </div>
      } />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
); 