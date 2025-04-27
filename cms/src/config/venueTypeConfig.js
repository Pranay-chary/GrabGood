export const venueTypeConfig = {
  FUNCTION_HALL: {
    requiredFields: ['capacity', 'parkingAvailable', 'acAvailable'],
    additionalFields: [
      {
        name: 'seatingArrangements',
        label: 'Seating Arrangements',
        type: 'multiselect',
        options: ['Theater', 'Classroom', 'Banquet', 'U-Shape']
      },
      {
        name: 'eventTypes',
        label: 'Suitable Event Types',
        type: 'multiselect',
        options: ['Wedding', 'Corporate', 'Birthday', 'Conference']
      },
      {
        name: 'items',
        label: 'Available Items',
        type: 'itemList',
        categories: [
          {
            name: 'Furniture',
            items: ['Tables', 'Chairs', 'Stage', 'Podium']
          },
          {
            name: 'Equipment',
            items: ['Projector', 'Sound System', 'Microphones', 'Lighting']
          },
          {
            name: 'Decor',
            items: ['Backdrop', 'Flower Arrangements', 'Table Decor', 'Lighting Decor']
          }
        ]
      }
    ]
  },
  RESTAURANT: {
    requiredFields: ['isVeg', 'capacity'],
    additionalFields: [
      {
        name: 'cuisineTypes',
        label: 'Cuisine Types',
        type: 'multiselect',
        options: ['Indian', 'Chinese', 'Italian', 'Continental']
      },
      {
        name: 'servingTimes',
        label: 'Serving Times',
        type: 'timeRange',
        multiple: true
      },
      {
        name: 'averageCostForTwo',
        label: 'Average Cost for Two',
        type: 'number'
      },
      {
        name: 'menuItems',
        label: 'Menu Items',
        type: 'menuList',
        categories: [
          {
            name: 'Starters',
            itemFields: ['name', 'price', 'description', 'isVeg', 'spiceLevel']
          },
          {
            name: 'Main Course',
            itemFields: ['name', 'price', 'description', 'isVeg', 'spiceLevel', 'servingSize']
          },
          {
            name: 'Desserts',
            itemFields: ['name', 'price', 'description', 'isVeg']
          },
          {
            name: 'Beverages',
            itemFields: ['name', 'price', 'description', 'isAlcoholic']
          }
        ]
      }
    ]
  },
  HOTEL: {
    requiredFields: ['parkingAvailable', 'acAvailable'],
    additionalFields: [
      {
        name: 'roomTypes',
        label: 'Room Types',
        type: 'roomList',
        categories: [
          {
            name: 'Standard',
            fields: ['quantity', 'basePrice', 'maxOccupancy', 'bedType', 'amenities']
          },
          {
            name: 'Deluxe',
            fields: ['quantity', 'basePrice', 'maxOccupancy', 'bedType', 'amenities']
          },
          {
            name: 'Suite',
            fields: ['quantity', 'basePrice', 'maxOccupancy', 'bedType', 'amenities', 'livingArea']
          },
          {
            name: 'Presidential Suite',
            fields: ['quantity', 'basePrice', 'maxOccupancy', 'bedType', 'amenities', 'livingArea', 'specialFeatures']
          }
        ]
      },
      {
        name: 'amenities',
        label: 'Amenities',
        type: 'multiselect',
        options: ['Swimming Pool', 'Gym', 'Spa', 'Restaurant', 'Room Service']
      },
      {
        name: 'checkInTime',
        label: 'Check-in Time',
        type: 'time'
      },
      {
        name: 'checkOutTime',
        label: 'Check-out Time',
        type: 'time'
      }
    ]
  },
  SWEETSHOP: {
    requiredFields: ['isVeg'],
    additionalFields: [
      {
        name: 'specialties',
        label: 'Specialties',
        type: 'multiselect',
        options: ['Indian Sweets', 'Cakes', 'Chocolates', 'Bakery Items']
      },
      {
        name: 'orderingOptions',
        label: 'Ordering Options',
        type: 'multiselect',
        options: ['Walk-in', 'Pre-order', 'Bulk Order', 'Custom Order']
      },
      {
        name: 'minimumOrderValue',
        label: 'Minimum Order Value',
        type: 'number'
      },
      {
        name: 'items',
        label: 'Sweet Items',
        type: 'sweetsList',
        categories: [
          {
            name: 'Indian Sweets',
            itemFields: ['name', 'price', 'unit', 'description', 'ingredients', 'shelfLife']
          },
          {
            name: 'Cakes',
            itemFields: ['name', 'price', 'size', 'description', 'flavors', 'customizable', 'eggless']
          },
          {
            name: 'Chocolates',
            itemFields: ['name', 'price', 'unit', 'description', 'type', 'ingredients']
          },
          {
            name: 'Bakery Items',
            itemFields: ['name', 'price', 'unit', 'description', 'type', 'isVeg', 'shelfLife']
          }
        ]
      }
    ]
  }
}; 