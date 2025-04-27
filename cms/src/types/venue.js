export const VenueType = {
  FUNCTION_HALL: 'FUNCTION_HALL',
  RESTAURANT: 'RESTAURANT',
  HOTEL: 'HOTEL',
  SWEETSHOP: 'SWEETSHOP',
};

export const PriceRange = {
  BUDGET: 'BUDGET',
  MODERATE: 'MODERATE',
  PREMIUM: 'PREMIUM',
};

export const VenueStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  INACTIVE: 'INACTIVE',
};

/**
 * @typedef {Object} VenueTypeSpecificDetails
 * @property {string[]} [seatingArrangements] - Function hall specific
 * @property {string[]} [eventTypes] - Function hall specific
 * @property {string[]} [cuisineTypes] - Restaurant specific
 * @property {Array<{start: string, end: string}>} [servingTimes] - Restaurant specific
 * @property {number} [averageCostForTwo] - Restaurant specific
 * @property {string[]} [roomTypes] - Hotel specific
 * @property {string[]} [amenities] - Hotel specific
 * @property {string} [checkInTime] - Hotel specific
 * @property {string} [checkOutTime] - Hotel specific
 * @property {string[]} [specialties] - Sweetshop specific
 * @property {string[]} [orderingOptions] - Sweetshop specific
 * @property {number} [minimumOrderValue] - Sweetshop specific
 */

/**
 * @typedef {Object} Venue
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {keyof typeof VenueType} type
 * @property {string} address
 * @property {string} capacity
 * @property {string} facilities
 * @property {string} contactName
 * @property {string} contactPhone
 * @property {string} contactEmail
 * @property {keyof typeof PriceRange} priceRange
 * @property {boolean} isActive
 * @property {boolean} [isVeg]
 * @property {boolean} parkingAvailable
 * @property {boolean} acAvailable
 * @property {string[]} [images]
 * @property {keyof typeof VenueStatus} status
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {VenueTypeSpecificDetails} typeSpecificDetails
 */

/**
 * @typedef {Object} VenueResponse
 * @property {Venue[]} data
 * @property {number} total
 * @property {number} page
 * @property {number} limit
 */ 