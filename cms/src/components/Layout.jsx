import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarIcon, 
  Cog6ToothIcon,
  BuildingOfficeIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Businesses', href: '/businesses', icon: BuildingOfficeIcon },
  { name: 'Bookings', href: '/bookings', icon: CalendarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

const businessTypes = [
  { name: 'Add Restaurant', href: '/business/add/restaurant', type: 'restaurant' },
  { name: 'Add Hotel', href: '/business/add/hotel', type: 'hotel' },
  { name: 'Add Function Hall', href: '/business/add/hall', type: 'hall' },
  { name: 'Add Sweet Shop', href: '/business/add/sweetshop', type: 'sweetshop' }
];

export const Layout = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleBusinessTypeClick = (type) => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-800">
                  GrabGood CMS
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Add Business Dropdown */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusCircleIcon className="h-5 w-5 mr-2" />
                    Add Business
                  </button>
                </div>

                {isDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {businessTypes.map((type) => (
                        <Link
                          key={type.name}
                          to={type.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={() => handleBusinessTypeClick(type.type)}
                        >
                          {type.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}; 