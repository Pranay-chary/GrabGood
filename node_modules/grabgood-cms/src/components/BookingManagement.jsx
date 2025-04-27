import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { businesses } from '../utils/api';

const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
};

const STATUS_STYLES = {
  PENDING: 'bg-yellow-50 text-yellow-800',
  CONFIRMED: 'bg-green-50 text-green-800',
  CANCELLED: 'bg-red-50 text-red-800',
  COMPLETED: 'bg-blue-50 text-blue-800',
};

const STATUS_ICONS = {
  PENDING: ClockIcon,
  CONFIRMED: CheckCircleIcon,
  CANCELLED: XCircleIcon,
  COMPLETED: CheckCircleIcon,
};

const BookingCard = ({ booking, onStatusChange }) => {
  const StatusIcon = STATUS_ICONS[booking.status];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${STATUS_STYLES[booking.status]}`}>
            <StatusIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{booking.venueName}</h3>
            <p className="text-sm text-gray-500">{booking.customerName}</p>
          </div>
        </div>
        <select
          value={booking.status}
          onChange={(e) => onStatusChange(booking.id, e.target.value)}
          className="rounded-md border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          {Object.keys(BOOKING_STATUS).map((status) => (
            <option key={status} value={status}>
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Date</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {format(new Date(booking.date), 'PPP')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Time</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {format(new Date(booking.startTime), 'p')} - {format(new Date(booking.endTime), 'p')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Contact</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {booking.contactNumber}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Amount</dt>
            <dd className="mt-1 text-sm text-gray-900">
              ₹{booking.amount.toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>

      {booking.notes && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <p className="text-sm font-medium text-gray-500">Notes</p>
          <p className="mt-1 text-sm text-gray-900">{booking.notes}</p>
        </div>
      )}
    </div>
  );
};

export const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  useEffect(() => {
    fetchBookings();
  }, [filter, dateRange]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await businesses.getBookings({ status: filter, dateRange });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await businesses.updateBookingStatus(bookingId, newStatus);
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
          
          <div className="flex space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-md border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Status</option>
              {Object.keys(BOOKING_STATUS).map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
            <p className="mt-1 text-sm text-gray-500">
              No bookings found for the selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 