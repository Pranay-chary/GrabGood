import React, { useState, useEffect } from 'react';
import PartnerNavbar from '../components/PartnerNavbar';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from '../utils/toastUtil';
import { useAuth } from '../context/AuthContext';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { refreshUserData } = useAuth();
  
  useEffect(() => {
    fetchNotifications();
  }, [filter, page]);
  
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // Map front-end filter types to backend enum values for API request
      let apiFilter = filter;
      if (filter !== 'all' && filter !== 'unread') {
        // For type filters, map to the backend enum values
        const typeMap = {
          'order': 'SURPLUS_FOOD_ALERT',
          'booking': 'BOOKING_UPDATE',
          'system': 'SYSTEM_ANNOUNCEMENT'
        };
        apiFilter = typeMap[filter] || filter;
      }
      
      const response = await fetch(`/api/notifications?filter=${apiFilter}&page=${page}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.data) {
          if (page === 1) {
            setNotifications(result.data);
          } else {
            setNotifications(prev => [...prev, ...result.data]);
          }
          
          setHasMore(result.data.length === 10);
        } else {
          throw new Error(result.message || 'Failed to fetch notifications');
        }
      } else {
        throw new Error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications. Please try again later.');
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };
  
  const markAsRead = async (id) => {
    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        // Update notification in the list
        setNotifications(
          notifications.map(notification => 
            notification._id === id 
              ? { ...notification, read: true } 
              : notification
          )
        );
        
        // Refresh user data to update unread count
        refreshUserData();
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark notification as read');
    }
  };
  
  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        // Update all notifications in the list
        setNotifications(
          notifications.map(notification => ({ ...notification, read: true }))
        );
        toast.success('All notifications marked as read');
        
        // Refresh user data to update unread count
        refreshUserData();
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to mark all notifications as read');
    }
  };
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return (
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        );
      case 'booking':
        return (
          <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'system':
        return (
          <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'alert':
        return (
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
        );
    }
  };
  
  const loadMore = () => {
    setPage(prev => prev + 1);
  };
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    
    // Map front-end filter types to backend enum values
    const typeMap = {
      'order': 'SURPLUS_FOOD_ALERT',
      'booking': 'BOOKING_UPDATE',
      'system': 'SYSTEM_ANNOUNCEMENT'
    };
    
    const backendType = typeMap[filter] || filter;
    return notification.type === backendType;
  });
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerNavbar />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Notifications
              </h2>
            </div>
            {unreadCount > 0 && (
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  className={`${
                    filter === 'all'
                      ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } py-4 px-6 text-center font-medium`}
                  onClick={() => { setFilter('all'); setPage(1); }}
                >
                  All
                </button>
                <button
                  className={`${
                    filter === 'unread'
                      ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } py-4 px-6 text-center font-medium`}
                  onClick={() => { setFilter('unread'); setPage(1); }}
                >
                  Unread
                </button>
                <button
                  className={`${
                    filter === 'order'
                      ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } py-4 px-6 text-center font-medium`}
                  onClick={() => { setFilter('order'); setPage(1); }}
                >
                  Orders
                </button>
                <button
                  className={`${
                    filter === 'booking'
                      ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } py-4 px-6 text-center font-medium`}
                  onClick={() => { setFilter('booking'); setPage(1); }}
                >
                  Bookings
                </button>
                <button
                  className={`${
                    filter === 'system'
                      ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } py-4 px-6 text-center font-medium`}
                  onClick={() => { setFilter('system'); setPage(1); }}
                >
                  System
                </button>
              </nav>
            </div>
            
            <div>
              {loading && page === 1 ? (
                <div className="py-20 text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2ecc71] mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Loading notifications...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 inline-block text-left">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="py-16 text-center">
                  <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <p className="mt-2 text-gray-500">No notifications found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification._id}
                      onClick={() => !notification.read && markAsRead(notification._id)}
                      className={`p-6 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start">
                        {getNotificationIcon(notification.type)}
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {notification.message}
                          </p>
                          {notification.actionUrl && (
                            <div className="mt-3">
                              <a
                                href={notification.actionUrl}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                              >
                                View Details
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {hasMore && (
                    <div className="px-6 py-4 text-center">
                      <button
                        onClick={loadMore}
                        disabled={loading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#2ecc71] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                      >
                        {loading ? (
                          <>
                            <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-r-2 border-[#2ecc71] rounded-full"></span>
                            Loading...
                          </>
                        ) : (
                          'Load More'
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage; 