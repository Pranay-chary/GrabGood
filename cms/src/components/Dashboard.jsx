import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  CurrencyRupeeIcon, 
  UserGroupIcon, 
  CalendarIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';
import { businesses } from '../utils/api';

const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="p-3 bg-indigo-50 rounded-full">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
    </div>
    {change && (
      <div className="mt-4">
        <span className={`text-sm ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
          {changeType === 'increase' ? '↑' : '↓'} {change}%
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    )}
  </div>
);

const Chart = ({ data }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h3>
    <div className="h-64 flex items-end justify-between space-x-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1">
          <div 
            className="bg-indigo-600 rounded-t" 
            style={{ height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
          />
          <p className="text-xs text-gray-500 text-center mt-2">{item.label}</p>
        </div>
      ))}
    </div>
  </div>
);

const RecentActivity = ({ activities }) => (
  <div className="bg-white rounded-lg shadow">
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      <div className="mt-4 space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className={`p-2 rounded-full ${activity.bgColor}`}>
              {activity.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeVenues: 0,
    monthlyUsers: 0
  });
  const [revenueData, setRevenueData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch statistics
        const statsData = await businesses.getStatistics();
        setStats(statsData);

        // Fetch revenue data
        const revenue = await businesses.getRevenueData();
        setRevenueData(revenue.map(item => ({
          label: item.month,
          value: item.amount
        })));

        // Fetch recent activities
        const recentActivities = await businesses.getRecentActivities();
        setActivities(recentActivities.map(activity => ({
          ...activity,
          icon: getActivityIcon(activity.type),
          bgColor: getActivityColor(activity.type)
        })));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'booking':
        return <CalendarIcon className="h-5 w-5 text-blue-600" />;
      case 'revenue':
        return <CurrencyRupeeIcon className="h-5 w-5 text-green-600" />;
      case 'venue':
        return <BuildingStorefrontIcon className="h-5 w-5 text-purple-600" />;
      default:
        return <UserGroupIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'booking':
        return 'bg-blue-50';
      case 'revenue':
        return 'bg-green-50';
      case 'venue':
        return 'bg-purple-50';
      default:
        return 'bg-gray-50';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={CalendarIcon}
            change={12}
            changeType="increase"
          />
          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon={CurrencyRupeeIcon}
            change={8}
            changeType="increase"
          />
          <StatCard
            title="Active Venues"
            value={stats.activeVenues}
            icon={BuildingStorefrontIcon}
            change={5}
            changeType="increase"
          />
          <StatCard
            title="Monthly Users"
            value={stats.monthlyUsers}
            icon={UserGroupIcon}
            change={3}
            changeType="decrease"
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Chart data={revenueData} />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity activities={activities} />
          </div>
        </div>
      </div>
    </div>
  );
}; 