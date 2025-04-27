import React, { useState } from 'react';

const HotelRooms = ({ rooms, onChange }) => {
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: 'standard',
    beds: {
      single: 0,
      double: 0,
      queen: 0,
      king: 0,
    },
    maxOccupancy: 2,
    amenities: {
      ac: false,
      tv: false,
      wifi: false,
      minibar: false,
      toiletries: false,
      coffeeMaker: false,
      hairDryer: false,
      ironBoard: false,
      workspace: false,
      bathtub: false,
    },
    totalRooms: 1,
    description: '',
  });

  const handleRoomChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('beds.')) {
      const bedType = name.split('.')[1];
      setNewRoom({
        ...newRoom,
        beds: {
          ...newRoom.beds,
          [bedType]: parseInt(value) || 0
        }
      });
    } else if (name.startsWith('amenities.')) {
      const amenity = name.split('.')[1];
      setNewRoom({
        ...newRoom,
        amenities: {
          ...newRoom.amenities,
          [amenity]: checked
        }
      });
    } else {
      setNewRoom({
        ...newRoom,
        [name]: type === 'number' ? (parseInt(value) || 0) : value
      });
    }
  };

  const addRoom = () => {
    if (!newRoom.name) return;
    
    const updatedRooms = [...rooms, { ...newRoom, id: Date.now() }];
    onChange(updatedRooms);
    
    setNewRoom({
      name: '',
      type: 'standard',
      beds: {
        single: 0,
        double: 0,
        queen: 0,
        king: 0,
      },
      maxOccupancy: 2,
      amenities: {
        ac: false,
        tv: false,
        wifi: false,
        minibar: false,
        toiletries: false,
        coffeeMaker: false,
        hairDryer: false,
        ironBoard: false,
        workspace: false,
        bathtub: false,
      },
      totalRooms: 1,
      description: '',
    });
  };

  const deleteRoom = (id) => {
    onChange(rooms.filter(room => room.id !== id));
  };

  const amenitiesList = [
    { id: 'ac', label: 'Air Conditioning' },
    { id: 'tv', label: 'TV' },
    { id: 'wifi', label: 'WiFi' },
    { id: 'minibar', label: 'Mini Bar' },
    { id: 'toiletries', label: 'Toiletries' },
    { id: 'coffeeMaker', label: 'Coffee Maker' },
    { id: 'hairDryer', label: 'Hair Dryer' },
    { id: 'ironBoard', label: 'Iron & Board' },
    { id: 'workspace', label: 'Workspace' },
    { id: 'bathtub', label: 'Bathtub' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Room Types</h3>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="text-md font-medium text-gray-700 mb-4">Add New Room Type</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Name</label>
            <input
              type="text"
              name="name"
              value={newRoom.name}
              onChange={handleRoomChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="e.g., Deluxe Double"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Type</label>
            <select
              name="type"
              value={newRoom.type}
              onChange={handleRoomChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            >
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
              <option value="executive">Executive</option>
              <option value="family">Family</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bed Configuration</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500">Single Beds</label>
                <input
                  type="number"
                  name="beds.single"
                  min="0"
                  value={newRoom.beds.single}
                  onChange={handleRoomChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">Double Beds</label>
                <input
                  type="number"
                  name="beds.double"
                  min="0"
                  value={newRoom.beds.double}
                  onChange={handleRoomChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">Queen Beds</label>
                <input
                  type="number"
                  name="beds.queen"
                  min="0"
                  value={newRoom.beds.queen}
                  onChange={handleRoomChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">King Beds</label>
                <input
                  type="number"
                  name="beds.king"
                  min="0"
                  value={newRoom.beds.king}
                  onChange={handleRoomChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Occupancy</label>
            <input
              type="number"
              name="maxOccupancy"
              min="1"
              value={newRoom.maxOccupancy}
              onChange={handleRoomChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Rooms</label>
            <input
              type="number"
              name="totalRooms"
              min="1"
              value={newRoom.totalRooms}
              onChange={handleRoomChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={newRoom.description}
              onChange={handleRoomChange}
              rows="2"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-2">
              {amenitiesList.map((amenity) => (
                <div key={amenity.id} className="flex items-center">
                  <input
                    id={`amenity-${amenity.id}`}
                    name={`amenities.${amenity.id}`}
                    type="checkbox"
                    checked={newRoom.amenities[amenity.id]}
                    onChange={handleRoomChange}
                    className="h-4 w-4 text-[#2ecc71] focus:ring-[#2ecc71] border-gray-300 rounded"
                  />
                  <label htmlFor={`amenity-${amenity.id}`} className="ml-2 block text-sm text-gray-700">
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            type="button"
            onClick={addRoom}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
          >
            Add Room Type
          </button>
        </div>
      </div>
      
      {/* List of room types */}
      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-700 mb-4">Your Room Types</h4>
        
        {rooms.length === 0 ? (
          <p className="text-gray-500 text-sm">No room types added yet</p>
        ) : (
          <div className="bg-white shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200">
              {rooms.map(room => (
                <li key={room.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-lg font-medium text-gray-900">{room.name}</h5>
                      <p className="text-sm text-gray-500">{room.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Max: {room.maxOccupancy} people
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {room.totalRooms} room{room.totalRooms !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Beds: 
                        {room.beds.single > 0 && ` ${room.beds.single} Single`}
                        {room.beds.double > 0 && ` ${room.beds.double} Double`}
                        {room.beds.queen > 0 && ` ${room.beds.queen} Queen`}
                        {room.beds.king > 0 && ` ${room.beds.king} King`}
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => deleteRoom(room.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelRooms; 