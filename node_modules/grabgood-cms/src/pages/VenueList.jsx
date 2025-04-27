import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { VenueType, PriceRange, VenueStatus } from '../types/venue';
import { formatDate } from '../utils/date';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortColumn, setSortColumn] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const columns = [
    {
      key: 'name',
      title: 'Venue Name',
      sortable: true,
    },
    {
      key: 'type',
      title: 'Type',
      sortable: true,
      render: (value) => VenueType[value] || value,
    },
    {
      key: 'address',
      title: 'Address',
      sortable: false,
    },
    {
      key: 'capacity',
      title: 'Capacity',
      sortable: true,
    },
    {
      key: 'priceRange',
      title: 'Price Range',
      sortable: true,
      render: (value) => PriceRange[value] || value,
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(value)}`}>
          {VenueStatus[value] || value}
        </span>
      ),
    },
    {
      key: 'createdAt',
      title: 'Created At',
      sortable: true,
      render: (value) => formatDate(value),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case VenueStatus.APPROVED:
        return 'bg-green-100 text-green-800';
      case VenueStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case VenueStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      case VenueStatus.INACTIVE:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [page, pageSize, sortColumn, sortDirection]);

  const fetchVenues = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/venues?page=${page}&limit=${pageSize}&sortBy=${sortColumn}&sortOrder=${sortDirection}`);
      const data = await response.json();
      setVenues(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching venues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSort = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  const handleRowClick = (venue) => {
    // Navigate to venue details page
    window.location.href = `/venues/${venue.id}`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Venues</h1>
        <button
          onClick={() => window.location.href = '/venues/new'}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add New Venue
        </button>
      </div>

      <DataTable
        data={venues}
        columns={columns}
        total={total}
        page={page}
        pageSize={pageSize}
        loading={loading}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onPageChange={handlePageChange}
        onSort={handleSort}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default VenueList; 