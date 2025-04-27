import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PartnerNavbar from '../components/PartnerNavbar';
import { DonationChart, BookingChart } from '../components/AnalyticsChart';
import apiService from '../utils/apiService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalBookings: 0,
    pendingBookings: 0,
    impactScore: 0
  });

  const [recentDonations, setRecentDonations] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        console.log('Fetching dashboard data...');
        
        const response = await apiService.get('/dashboard');
        
        if (response.success) {
          setStats(response.data.stats || {
            totalDonations: 0,
            totalBookings: 0,
            pendingBookings: 0,
            impactScore: 0
          });
          setRecentDonations(response.data.recentDonations || []);
          setRecentBookings(response.data.recentBookings || []);
          setBusinesses(response.data.businesses || []);
        } else {
          setError(response.message || 'Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Function to get business type icon
  const getBusinessTypeIcon = (type) => {
    switch (type) {
      case 'restaurant':
        return (
          <svg className="h-6 w-6 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'hotel':
        return (
          <svg className="h-6 w-6 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'function-hall':
        return (
          <svg className="h-6 w-6 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'sweet-shop':
        return (
          <svg className="h-6 w-6 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      default:
        return (
          <svg className="h-6 w-6 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
    }
  };

  // Format business type for display
  const formatBusinessType = (type) => {
    if (type === 'function-hall') return 'Function Hall';
    if (type === 'sweet-shop') return 'Sweet Shop';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PartnerNavbar />
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2ecc71]"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerNavbar />
      
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

          {/* Business Registration Prompt */}
          {businesses.length === 0 && (
            <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Register Your Business</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      To get started, select a business type and add your business details.
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <Link
                    to="/business-type-selection"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                  >
                    Add Your Business
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {/* Business Listings */}
          {businesses.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Your Businesses</h2>
                <Link
                  to="/business-type-selection"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                >
                  Add Another Business
                </Link>
              </div>
              
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {businesses.map((business) => (
                  <div key={business.id} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          {getBusinessTypeIcon(business.businessType)}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {business.businessName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatBusinessType(business.businessType)}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {business.address}, {business.city}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        {business.businessType === 'restaurant' && (
                          <Link
                            to="/restaurant-management"
                            className="flex-1 text-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            Manage
                          </Link>
                        )}
                        {business.businessType === 'hotel' && (
                          <Link
                            to="/hotel-management"
                            className="flex-1 text-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            Manage
                          </Link>
                        )}
                        {business.businessType === 'function-hall' && (
                          <Link
                            to="/hall-management"
                            className="flex-1 text-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            Manage
                          </Link>
                        )}
                        {business.businessType === 'sweet-shop' && (
                          <Link
                            to="/sweet-shop-management"
                            className="flex-1 text-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            Manage
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Donations
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.totalDonations}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[#e67e22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Bookings
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.totalBookings}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Bookings
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.pendingBookings}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Impact Score
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stats.impactScore}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Donation History</h3>
              <DonationChart />
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Booking History</h3>
              <BookingChart />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Recent Donations */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Donations</h3>
                <div className="mt-4 flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {recentDonations.length > 0 ? (
                      recentDonations.map((donation) => (
                        <li key={donation.id} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#2ecc71] bg-opacity-10">
                                <span className="text-[#2ecc71] text-lg font-medium">
                                  {donation.foodType[0].toUpperCase()}
                                </span>
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {donation.foodType}
                              </p>
                              <p className="text-sm text-gray-500">
                                {donation.quantity}kg • {donation.servings} servings
                              </p>
                            </div>
                            <div className="flex-shrink-0 text-sm text-gray-500">
                              {new Date(donation.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="py-4 text-center text-gray-500">No recent donations</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
                <div className="mt-4 flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {recentBookings.length > 0 ? (
                      recentBookings.map((booking) => (
                        <li key={booking.id} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#e67e22] bg-opacity-10">
                                <span className="text-[#e67e22] text-lg font-medium">
                                  {booking.customerName[0].toUpperCase()}
                                </span>
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {booking.customerName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {booking.service} • {booking.guests} guests
                              </p>
                            </div>
                            <div className="flex-shrink-0 text-sm text-gray-500">
                              {new Date(booking.bookingDate).toLocaleDateString()}
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="py-4 text-center text-gray-500">No recent bookings</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
