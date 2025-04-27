import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Listings', value: '124' },
    { label: 'Active Deals', value: '45' },
    { label: 'Media Items', value: '286' },
    { label: 'Total Views', value: '12.5k' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name || 'User'}!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your platform today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Placeholder for recent activity list */}
            <p className="text-gray-600">No recent activity to display.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
              <p className="font-medium text-gray-900">Add New Listing</p>
              <p className="text-sm text-gray-600">Create a new listing entry</p>
            </button>
            <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
              <p className="font-medium text-gray-900">Upload Media</p>
              <p className="text-sm text-gray-600">Add new images or videos</p>
            </button>
            <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
              <p className="font-medium text-gray-900">Create Deal</p>
              <p className="text-sm text-gray-600">Set up a new deal</p>
            </button>
            <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
              <p className="font-medium text-gray-900">View Reports</p>
              <p className="text-sm text-gray-600">Access analytics data</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 