import React, { useState } from 'react';

const FunctionHallAvailability = ({ availability, venues, onChange }) => {
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedDates, setSelectedDates] = useState({
    startDate: '',
    endDate: '',
  });
  const [availabilityStatus, setAvailabilityStatus] = useState('available');
  const [selectedShift, setSelectedShift] = useState('full');

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setSelectedDates({
      ...selectedDates,
      [name]: value
    });
  };

  const updateAvailability = () => {
    if (!selectedVenue || !selectedDates.startDate || !selectedDates.endDate) {
      alert('Please select a venue and date range');
      return;
    }

    // Convert date strings to Date objects for comparison
    const startDate = new Date(selectedDates.startDate);
    const endDate = new Date(selectedDates.endDate);
    
    if (startDate > endDate) {
      alert('Start date must be before end date');
      return;
    }

    // Create array of all dates in the range
    const dateRange = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dateRange.push(new Date(currentDate).toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Update availability for each date in the range
    const updatedAvailability = { ...availability };
    
    dateRange.forEach(date => {
      if (!updatedAvailability[date]) {
        updatedAvailability[date] = {};
      }
      
      if (!updatedAvailability[date][selectedVenue]) {
        updatedAvailability[date][selectedVenue] = {};
      }
      
      // If full shift is selected, mark both morning and evening
      if (selectedShift === 'full') {
        updatedAvailability[date][selectedVenue] = {
          morning: availabilityStatus,
          evening: availabilityStatus
        };
      } else {
        updatedAvailability[date][selectedVenue][selectedShift] = availabilityStatus;
      }
    });

    onChange(updatedAvailability);

    alert(`Availability updated for ${dateRange.length} days`);
  };

  // Get next 30 dates from today
  const today = new Date();
  const next30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const getStatusForDateAndVenue = (date, venueId, shift) => {
    if (!availability[date] || !availability[date][venueId] || !availability[date][venueId][shift]) {
      return 'available'; // Default to available if not set
    }
    return availability[date][venueId][shift];
  };

  const getShiftStatusDisplay = (status) => {
    switch (status) {
      case 'available':
        return { color: 'bg-green-100 text-green-800', text: 'A' };
      case 'limited':
        return { color: 'bg-yellow-100 text-yellow-800', text: 'L' };
      case 'booked':
        return { color: 'bg-red-100 text-red-800', text: 'B' };
      case 'maintenance':
        return { color: 'bg-gray-100 text-gray-800', text: 'M' };
      default:
        return { color: 'bg-green-100 text-green-800', text: 'A' };
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Venue Availability</h3>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="text-md font-medium text-gray-700 mb-4">Update Availability</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Venue</label>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            >
              <option value="">Select a venue</option>
              {venues.map(venue => (
                <option key={venue.id} value={venue.id}>
                  {venue.name} (Capacity: {venue.capacity})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Shift</label>
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            >
              <option value="full">Full Day</option>
              <option value="morning">Morning (8 AM - 3 PM)</option>
              <option value="evening">Evening (4 PM - 11 PM)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={availabilityStatus}
              onChange={(e) => setAvailabilityStatus(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            >
              <option value="available">Available</option>
              <option value="limited">Limited Availability</option>
              <option value="booked">Fully Booked</option>
              <option value="maintenance">Under Maintenance</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={selectedDates.startDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={selectedDates.endDate}
              onChange={handleDateChange}
              min={selectedDates.startDate || new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <button
            type="button"
            onClick={updateAvailability}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
          >
            Update Availability
          </button>
        </div>
      </div>
      
      {/* Availability Calendar */}
      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-700 mb-4">Availability Overview (Next 14 Days)</h4>
        
        {venues.length === 0 ? (
          <p className="text-gray-500 text-sm">No venues added yet. Please add venues first.</p>
        ) : (
          <div className="bg-white shadow overflow-hidden rounded-md">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Venue
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shift
                    </th>
                    {next30Days.slice(0, 14).map(date => (
                      <th 
                        key={date} 
                        scope="col" 
                        className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div>{new Date(date).getDate()}</div>
                        <div>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(date).getDay()]}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {venues.map(venue => (
                    <>
                      <tr key={`${venue.id}-morning`}>
                        {/* First row is morning shift */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" rowSpan={2}>
                          {venue.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Morning
                        </td>
                        {next30Days.slice(0, 14).map(date => {
                          const status = getStatusForDateAndVenue(date, venue.id, 'morning');
                          const display = getShiftStatusDisplay(status);
                          
                          return (
                            <td key={`${date}-morning`} className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                              <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${display.color}`}>
                                {display.text}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                      <tr key={`${venue.id}-evening`}>
                        {/* Second row is evening shift */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Evening
                        </td>
                        {next30Days.slice(0, 14).map(date => {
                          const status = getStatusForDateAndVenue(date, venue.id, 'evening');
                          const display = getShiftStatusDisplay(status);
                          
                          return (
                            <td key={`${date}-evening`} className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                              <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${display.color}`}>
                                {display.text}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-center space-x-6">
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 mr-2">A</span>
            <span className="text-sm text-gray-500">Available</span>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 mr-2">L</span>
            <span className="text-sm text-gray-500">Limited</span>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 mr-2">B</span>
            <span className="text-sm text-gray-500">Booked</span>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-800 mr-2">M</span>
            <span className="text-sm text-gray-500">Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionHallAvailability; 