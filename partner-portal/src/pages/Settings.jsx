import React, { useState, useEffect } from 'react';
import PartnerNavbar from '../components/PartnerNavbar';
import { toast } from '../utils/toastUtil';
import apiService from '../utils/apiService';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Form states
  const [accountForm, setAccountForm] = useState({
    name: '',
    email: '',
    phone: '',
    language: 'english',
    timezone: 'UTC+5:30',
  });
  
  const [notificationForm, setNotificationForm] = useState({
    emailNotifications: true,
    smsNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
    newFeatures: true,
    securityAlerts: true,
  });
  
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        const response = await apiService.get('/auth/me');
        
        if (response && response.success) {
          setUserData(response.data);
          
          // Initialize form data with user data
          setAccountForm({
            name: response.data.name || '',
            email: response.data.email || '',
            phone: response.data.phone || '',
            language: response.data.language || 'english',
            timezone: response.data.timezone || 'UTC+5:30',
          });
          
          // If notification preferences exist, set them
          if (response.data.notificationPreferences) {
            setNotificationForm(response.data.notificationPreferences);
          }
        } else {
          throw new Error(response.message || 'Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationForm(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apiService.put('/auth/updateprofile', accountForm);
      
      if (response && response.success) {
        toast.success('Account settings updated successfully');
      } else {
        throw new Error(response.message || 'Failed to update account settings');
      }
    } catch (error) {
      console.error('Error updating account settings:', error);
      toast.error(error.message || 'Failed to update account settings');
    }
  };
  
  const handleNotificationsSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apiService.put('/auth/notifications/preferences', notificationForm);
      
      if (response && response.success) {
        toast.success('Notification preferences updated successfully');
      } else {
        throw new Error(response.message || 'Failed to update notification preferences');
      }
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      toast.error(error.message || 'Failed to update notification preferences');
    }
  };
  
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    try {
      const response = await apiService.put('/auth/changepassword', {
        currentPassword: securityForm.currentPassword,
        newPassword: securityForm.newPassword
      });
      
      if (response && response.success) {
        toast.success('Password changed successfully');
        setSecurityForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        throw new Error(response.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error.message || 'Failed to change password');
    }
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
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PartnerNavbar />
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
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
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerNavbar />
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Settings
              </h2>
            </div>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  className={`${
                    activeTab === 'account'
                      ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } py-4 px-6 text-center font-medium`}
                  onClick={() => setActiveTab('account')}
                >
                  Account
                </button>
                <button
                  className={`${
                    activeTab === 'notifications'
                      ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } py-4 px-6 text-center font-medium`}
                  onClick={() => setActiveTab('notifications')}
                >
                  Notifications
                </button>
                <button
                  className={`${
                    activeTab === 'security'
                      ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } py-4 px-6 text-center font-medium`}
                  onClick={() => setActiveTab('security')}
                >
                  Security
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {/* Account Settings Tab */}
              {activeTab === 'account' && (
                <form onSubmit={handleAccountSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={accountForm.name}
                          onChange={handleAccountChange}
                          className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={accountForm.email}
                          onChange={handleAccountChange}
                          className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={accountForm.phone}
                          onChange={handleAccountChange}
                          className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Language
                      </label>
                      <div className="mt-1">
                        <select
                          id="language"
                          name="language"
                          value={accountForm.language}
                          onChange={handleAccountChange}
                          className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                          <option value="tamil">Tamil</option>
                          <option value="telugu">Telugu</option>
                          <option value="kannada">Kannada</option>
                          <option value="malayalam">Malayalam</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                        Timezone
                      </label>
                      <div className="mt-1">
                        <select
                          id="timezone"
                          name="timezone"
                          value={accountForm.timezone}
                          onChange={handleAccountChange}
                          className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="UTC+5:30">Indian Standard Time (IST)</option>
                          <option value="UTC+0">Greenwich Mean Time (GMT)</option>
                          <option value="UTC-8">Pacific Standard Time (PST)</option>
                          <option value="UTC-5">Eastern Standard Time (EST)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
              
              {/* Notification Settings Tab */}
              {activeTab === 'notifications' && (
                <form onSubmit={handleNotificationsSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="emailNotifications"
                          name="emailNotifications"
                          type="checkbox"
                          checked={notificationForm.emailNotifications}
                          onChange={handleNotificationChange}
                          className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                          Email Notifications
                        </label>
                        <p className="text-gray-500">Receive notifications via email</p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="smsNotifications"
                          name="smsNotifications"
                          type="checkbox"
                          checked={notificationForm.smsNotifications}
                          onChange={handleNotificationChange}
                          className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="smsNotifications" className="font-medium text-gray-700">
                          SMS Notifications
                        </label>
                        <p className="text-gray-500">Receive notifications via SMS</p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="orderUpdates"
                          name="orderUpdates"
                          type="checkbox"
                          checked={notificationForm.orderUpdates}
                          onChange={handleNotificationChange}
                          className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="orderUpdates" className="font-medium text-gray-700">
                          Order Updates
                        </label>
                        <p className="text-gray-500">Receive notifications for new orders and updates</p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="marketingEmails"
                          name="marketingEmails"
                          type="checkbox"
                          checked={notificationForm.marketingEmails}
                          onChange={handleNotificationChange}
                          className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="marketingEmails" className="font-medium text-gray-700">
                          Marketing Emails
                        </label>
                        <p className="text-gray-500">Receive promotional emails and offers</p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newFeatures"
                          name="newFeatures"
                          type="checkbox"
                          checked={notificationForm.newFeatures}
                          onChange={handleNotificationChange}
                          className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="newFeatures" className="font-medium text-gray-700">
                          New Features
                        </label>
                        <p className="text-gray-500">Get notified when new features are available</p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="securityAlerts"
                          name="securityAlerts"
                          type="checkbox"
                          checked={notificationForm.securityAlerts}
                          onChange={handleNotificationChange}
                          className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="securityAlerts" className="font-medium text-gray-700">
                          Security Alerts
                        </label>
                        <p className="text-gray-500">Get notified about security-related events</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                    >
                      Save Preferences
                    </button>
                  </div>
                </form>
              )}
              
              {/* Security Settings Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <div className="mt-1">
                          <input
                            type="password"
                            name="currentPassword"
                            id="currentPassword"
                            value={securityForm.currentPassword}
                            onChange={handleSecurityChange}
                            required
                            className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <div className="mt-1">
                          <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            value={securityForm.newPassword}
                            onChange={handleSecurityChange}
                            required
                            className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <div className="mt-1">
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={securityForm.confirmPassword}
                            onChange={handleSecurityChange}
                            required
                            className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                        >
                          Enable Two-Factor Authentication
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Login Sessions</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        These are the devices that have logged into your account. Revoke any sessions that you do not recognize.
                      </p>
                      <div className="mt-4 space-y-4">
                        <div className="border border-gray-200 rounded-md p-4">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">Chrome on Windows</h4>
                              <div className="mt-1 text-xs text-gray-500">
                                <p>IP Address: 192.168.1.1</p>
                                <p>Last accessed: Today, 10:30 AM</p>
                              </div>
                            </div>
                            <div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Current Session
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-md p-4">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">Safari on iPhone</h4>
                              <div className="mt-1 text-xs text-gray-500">
                                <p>IP Address: 172.16.254.1</p>
                                <p>Last accessed: Yesterday, 4:15 PM</p>
                              </div>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                Revoke
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings; 