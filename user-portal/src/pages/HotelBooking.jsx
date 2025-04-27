import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaCheck, FaArrowRight, 
  FaPhoneAlt, FaClock, FaWifi, FaParking, FaUtensils, FaSwimmingPool, 
  FaSearch, FaPercent, FaFilter, FaBed, FaHotel, FaCreditCard, 
  FaSpinner, FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import SearchBar from '../components/SearchBar';

// Hotel categories
const hotelCategories = [
  { id: 'hotel', name: 'Hotels', icon: '🏨' },
  { id: 'resort', name: 'Resorts', icon: '🌴' },
  { id: 'apartment', name: 'Apartments', icon: '🏢' },
  { id: 'villa', name: 'Villas', icon: '🏡' },
  { id: 'hostel', name: 'Hostels', icon: '🛏️' },
  { id: 'guesthouse', name: 'Guest Houses', icon: '🏠' },
  { id: 'cottage', name: 'Cottages', icon: '🏕️' },
  { id: 'boutique', name: 'Boutique Hotels', icon: '✨' },
];

// Major cities in India
const citiesData = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Goa"
];

// Popular localities by city
const localities = {
  'Mumbai': ['Juhu', 'Bandra', 'Andheri', 'Worli', 'Colaba'],
  'Delhi': ['Connaught Place', 'Karol Bagh', 'Dwarka', 'Aerocity', 'South Delhi'],
  'Bangalore': ['Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'MG Road'],
  'Pune': ['Koregaon Park', 'Viman Nagar', 'Baner', 'Hinjewadi', 'Shivaji Nagar'],
  'Hyderabad': ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Hitech City', 'Secunderabad'],
  'Chennai': ['T. Nagar', 'Nungambakkam', 'Anna Nagar', 'Adyar', 'Besant Nagar'],
  'Kolkata': ['Park Street', 'Salt Lake', 'New Town', 'Ballygunge', 'Alipore'],
  'Ahmedabad': ['Navrangpura', 'Bodakdev', 'SG Highway', 'Satellite', 'Prahlad Nagar'],
  'Jaipur': ['Malviya Nagar', 'C Scheme', 'Vaishali Nagar', 'Mansarovar', 'Raja Park'],
  'Goa': ['Calangute', 'Baga', 'Panjim', 'Candolim', 'Anjuna']
};

// Sample hotel data
const hotels = [
  {
    id: 1,
    name: 'Luxury Grand Hotel',
    category: 'hotel',
    city: 'Mumbai',
    locality: 'Juhu',
    address: '123 Juhu Beach Road, Mumbai - 400049',
    location: {
      latitude: 19.0890,
      longitude: 72.8258,
      description: 'Beachfront location in Juhu'
    },
    pricePerNight: 8500,
    discount: 15,
    discountedPrice: 7225,
    rating: 4.7,
    reviewCount: 843,
    starRating: 5,
    freeCancellation: true,
    payAtProperty: true,
    sustainabilityLevel: 'Level 2',
    dealType: 'Exclusive Deal',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427',
    ],
    amenities: [
      { name: 'Free WiFi', icon: 'FaWifi', included: true },
      { name: 'Swimming Pool', icon: 'FaSwimmingPool', included: true },
      { name: 'Spa', icon: 'FaSpa', included: true },
      { name: 'Restaurant', icon: 'FaUtensils', included: true },
      { name: 'Fitness Center', icon: 'FaDumbbell', included: true },
      { name: 'Free Parking', icon: 'FaParking', included: true },
      { name: 'Room Service', icon: 'FaConcierge', included: true },
      { name: 'Air Conditioning', icon: 'FaSnowflake', included: true },
      { name: 'Beach Access', icon: 'FaUmbrella', included: true },
    ],
    roomTypes: [
      {
        id: 101,
        name: 'Deluxe Room',
        occupancy: { adults: 2, children: 1 },
        beds: '1 King Bed',
        size: '35 sq m',
        view: 'City View',
        pricePerNight: 8500,
        discountedPrice: 7225,
        amenities: ['Free WiFi', 'TV', 'Mini Bar', 'Safe', 'Air Conditioning'],
        available: true,
        totalRooms: 5,
        mealPlan: 'Breakfast included',
        cancellationPolicy: 'Free cancellation before 24 hours',
        images: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427',
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
        ]
      },
      {
        id: 102,
        name: 'Premium Suite',
        occupancy: { adults: 2, children: 2 },
        beds: '1 King Bed + 1 Sofa Bed',
        size: '55 sq m',
        view: 'Sea View',
        pricePerNight: 15000,
        discountedPrice: 12750,
        amenities: ['Free WiFi', 'TV', 'Mini Bar', 'Safe', 'Air Conditioning', 'Jacuzzi', 'Balcony'],
        available: true,
        totalRooms: 2,
        mealPlan: 'Breakfast included',
        cancellationPolicy: 'Free cancellation before 48 hours',
        images: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
        ]
      }
    ],
    reviews: [
      {
        id: 1001,
        userName: 'Rajesh M.',
        rating: 4.8,
        date: '2023-08-10',
        comment: 'Excellent service and beautiful property with beachfront access. Would definitely recommend!',
        tripType: 'Family',
        stayDuration: '3 nights'
      },
      {
        id: 1002,
        userName: 'Priya S.',
        rating: 4.5,
        date: '2023-07-22',
        comment: 'Great location and amenities. The spa services were exceptional.',
        tripType: 'Couple',
        stayDuration: '2 nights'
      }
    ],
    availableDates: [
      { date: '2023-11-01', price: 8500 },
      { date: '2023-11-02', price: 8500 },
      { date: '2023-11-03', price: 8500 },
      { date: '2023-11-04', price: 9500 },
      { date: '2023-11-05', price: 9500 },
      { date: '2023-11-06', price: 8500 },
      { date: '2023-11-07', price: 8500 },
    ],
    highlights: [
      'Prime beachfront location',
      'Award-winning restaurant',
      'Luxurious spa facilities',
      'Panoramic sea views',
    ],
    policies: [
      'Check-in: 2:00 PM',
      'Check-out: 11:00 AM',
      'Pet policy: No pets allowed',
      'Child policy: Children of all ages welcome'
    ],
    nearbyAttractions: [
      { name: 'Juhu Beach', distance: '100m' },
      { name: 'Mumbai Film City', distance: '8 km' },
      { name: 'Bandra-Worli Sea Link', distance: '12 km' }
    ]
  },
  // More sample hotels would be defined here...
];

// Component definition
const HotelBooking = () => {
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filters, setFilters] = useState({
    city: '',
    locality: '',
    checkin: '',
    checkout: '',
    guests: { adults: 2, children: 0, rooms: 1 },
    priceRange: { min: 0, max: 50000 },
    starRating: [],
    amenities: [],
    propertyType: [],
    mealPlan: '',
    distance: '',
    freeCancellation: false,
    payAtProperty: false,
  });
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    arrivalTime: '',
    paymentMethod: 'card'
  });
  const [searchParams, setSearchParams] = useState({
    city: '',
    checkin: '',
    checkout: '',
    guests: { adults: 2, children: 0, rooms: 1 }
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('recommended');
  const [viewType, setViewType] = useState('list');
  const [cities, setCities] = useState(citiesData);
  const [localitiesList, setLocalitiesList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const modalRef = useRef(null);
  const searchRef = useRef(null);

  // Initialize AOS and load saved data
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    
    // Load saved favorites
    const savedFavorites = localStorage.getItem('favoriteHotels');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Load recently viewed hotels
    const recentHotels = localStorage.getItem('recentlyViewedHotels');
    if (recentHotels) {
      setRecentlyViewed(JSON.parse(recentHotels));
    }
    
    // Set default dates if not already set
    if (!filters.checkin) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const dayAfterTomorrow = new Date();
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
      
      setFilters({
        ...filters,
        checkin: tomorrow.toISOString().split('T')[0],
        checkout: dayAfterTomorrow.toISOString().split('T')[0]
      });
    }
  }, []);
  
  // Handle modal open/close
  useEffect(() => {
    if (selectedHotel) {
      document.addEventListener('mousedown', handleClickOutside);
      
      // Add escape key listener
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };
      document.addEventListener('keydown', handleEscape);
      
      // Add to recently viewed
      addToRecentlyViewed(selectedHotel.id);
      
      // Cleanup listeners
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [selectedHotel]);
  
  // Update localities when city changes
  useEffect(() => {
    if (filters.city && localities[filters.city]) {
      setLocalitiesList(localities[filters.city]);
    } else {
      setLocalitiesList([]);
    }
  }, [filters.city]);
  
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };
  
  const closeModal = () => {
    setSelectedHotel(null);
    setCurrentImageIndex(0);
    setSelectedRoom(null);
    setActiveTab('details');
    setBookingStep(1);
    setFormSubmitted(false);
  };
  
  const addToRecentlyViewed = (hotelId) => {
    // Add to recently viewed and store in localStorage
    const updatedRecent = [hotelId, ...recentlyViewed.filter(id => id !== hotelId)].slice(0, 5);
    setRecentlyViewed(updatedRecent);
    localStorage.setItem('recentlyViewedHotels', JSON.stringify(updatedRecent));
  };
  
  const toggleFavorite = (hotelId) => {
    const newFavorites = favorites.includes(hotelId)
      ? favorites.filter(id => id !== hotelId)
      : [...favorites, hotelId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteHotels', JSON.stringify(newFavorites));
  };

  // Handle search functionality
  const handleSearch = (params = {}) => {
    setIsLoading(true);
    const newFilters = { ...filters, ...params };
    setFilters(newFilters);
    
    // Save search params
    if (params.city || params.checkin || params.checkout || params.guests) {
      setSearchParams({
        city: params.city || searchParams.city,
        checkin: params.checkin || searchParams.checkin,
        checkout: params.checkout || searchParams.checkout,
        guests: params.guests || searchParams.guests
      });
    }
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = hotels.filter(hotel => {
        // City filter
        const matchCity = !newFilters.city || 
          hotel.city.toLowerCase() === newFilters.city.toLowerCase();
        
        // Locality filter
        const matchLocality = !newFilters.locality || 
          hotel.locality.toLowerCase() === newFilters.locality.toLowerCase();
        
        // Price range filter
        const hotelPrice = hotel.discountedPrice || hotel.pricePerNight;
        const matchPrice = hotelPrice >= newFilters.priceRange.min && 
                          hotelPrice <= newFilters.priceRange.max;
        
        // Star rating filter
        const matchStarRating = newFilters.starRating.length === 0 ||
                               newFilters.starRating.includes(hotel.starRating);
        
        // Property type filter
        const matchPropertyType = newFilters.propertyType.length === 0 ||
                                 newFilters.propertyType.includes(hotel.category);
        
        // Amenities filter
        const matchAmenities = newFilters.amenities.length === 0 ||
                              newFilters.amenities.every(amenity => 
                                hotel.amenities.some(a => a.name === amenity && a.included));
        
        // Free cancellation
        const matchCancellation = !newFilters.freeCancellation || hotel.freeCancellation;
        
        // Pay at property
        const matchPayAtProperty = !newFilters.payAtProperty || hotel.payAtProperty;
        
        // Meal plan
        const matchMealPlan = !newFilters.mealPlan || 
                             hotel.roomTypes.some(room => room.mealPlan.includes(newFilters.mealPlan));
        
        // Check availability for selected dates
        let matchAvailability = true;
        if (newFilters.checkin && newFilters.checkout) {
          // This would typically be checked against the hotel's availability API
          // For demo purposes, we'll assume all hotels are available if they have availableDates
          matchAvailability = hotel.availableDates && hotel.availableDates.length > 0;
        }
        
        return matchCity && matchLocality && matchPrice && matchStarRating && 
               matchPropertyType && matchAmenities && matchCancellation && 
               matchPayAtProperty && matchMealPlan && matchAvailability;
      });
      
      setFilteredHotels(filtered);
      setIsLoading(false);
    }, 500);
  };
  
  // Handle price range selection
  const handlePriceRangeFilter = (min, max) => {
    handleSearch({ priceRange: { min, max } });
  };
  
  // Toggle star rating filter
  const toggleStarRating = (rating) => {
    const currentRatings = [...filters.starRating];
    const index = currentRatings.indexOf(rating);
    
    if (index > -1) {
      currentRatings.splice(index, 1);
    } else {
      currentRatings.push(rating);
    }
    
    handleSearch({ starRating: currentRatings });
  };
  
  // Toggle property type filter
  const togglePropertyType = (type) => {
    const currentTypes = [...filters.propertyType];
    const index = currentTypes.indexOf(type);
    
    if (index > -1) {
      currentTypes.splice(index, 1);
    } else {
      currentTypes.push(type);
    }
    
    handleSearch({ propertyType: currentTypes });
  };
  
  // Toggle amenity filter
  const toggleAmenity = (amenity) => {
    const currentAmenities = [...filters.amenities];
    const index = currentAmenities.indexOf(amenity);
    
    if (index > -1) {
      currentAmenities.splice(index, 1);
    } else {
      currentAmenities.push(amenity);
    }
    
    handleSearch({ amenities: currentAmenities });
  };
  
  // Sort hotels
  const sortHotels = (sortBy) => {
    setSort(sortBy);
    let sorted = [...filteredHotels];
    
    switch(sortBy) {
      case 'price-low':
        sorted.sort((a, b) => (a.discountedPrice || a.pricePerNight) - (b.discountedPrice || b.pricePerNight));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.discountedPrice || b.pricePerNight) - (a.discountedPrice || a.pricePerNight));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'distance':
        // Would require actual distance calculation from user/search location
        // For demo, we'll use a proxy (like hotel ID) for ordering
        sorted.sort((a, b) => a.id - b.id);
        break;
      case 'recommended':
      default:
        // Combine factors for "best match" algorithm
        sorted.sort((a, b) => {
          // Higher rating and review count is better
          const ratingScore = (b.rating * Math.log(b.reviewCount + 1)) - 
                              (a.rating * Math.log(a.reviewCount + 1));
          
          // Lower price is better (normalized by star rating)
          const priceA = (a.discountedPrice || a.pricePerNight) / a.starRating;
          const priceB = (b.discountedPrice || b.pricePerNight) / b.starRating;
          const priceScore = priceA - priceB;
          
          // Combine scores (weight ratings more than price)
          return ratingScore * 2 + priceScore;
        });
        break;
    }
    
    setFilteredHotels(sorted);
  };
  
  // Update guest count
  const updateGuests = (type, value) => {
    const newGuests = { ...filters.guests };
    newGuests[type] = value;
    
    // Adjust rooms if needed
    if (type === 'adults' && value < newGuests.rooms) {
      newGuests.rooms = value;
    }
    
    handleSearch({ guests: newGuests });
  };
  
  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Handle room selection
  const selectRoom = (room) => {
    setSelectedRoom(room);
    setBookingStep(2);
  };
  
  // Handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!bookingForm.firstName || !bookingForm.lastName || !bookingForm.email || !bookingForm.phone) {
      setError('Please fill all required fields');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call for booking
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormSubmitted(true);
      setError('');
      setBookingStep(3);
    } catch (err) {
      setError('An error occurred while processing your booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle booking tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Image navigation
  const nextImage = () => {
    const hotel = selectedHotel || (selectedRoom ? { images: selectedRoom.images } : null);
    if (hotel) {
      setCurrentImageIndex((prev) => 
        prev === hotel.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const prevImage = () => {
    const hotel = selectedHotel || (selectedRoom ? { images: selectedRoom.images } : null);
    if (hotel) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? hotel.images.length - 1 : prev - 1
      );
    }
  };
  
  // Calculate stay duration in nights
  const calculateNights = () => {
    if (!filters.checkin || !filters.checkout) return 1;
    
    const checkin = new Date(filters.checkin);
    const checkout = new Date(filters.checkout);
    const timeDiff = checkout.getTime() - checkin.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };
  
  // Return filtered recently viewed hotels
  const getFilteredRecentlyViewed = () => {
    return hotels.filter(hotel => recentlyViewed.includes(hotel.id));
  };

  // Main render
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
            <p className="text-xl mb-8">Great deals on hotels, homes, and much more...</p>
          </div>
          
          {/* Search Box */}
          <div 
            className="bg-white rounded-lg shadow-lg p-5 md:p-8 max-w-6xl mx-auto -mb-20 relative z-10" 
            data-aos="fade-up"
            data-aos-delay="100"
            ref={searchRef}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Destination */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Destination/Property</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaMapMarkerAlt />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Where are you going?"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={filters.city}
                    onChange={(e) => handleSearch({ city: e.target.value, locality: '' })}
                  />
                  {filters.city && (
                    <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
                      {cities.filter(city => 
                        city.toLowerCase().includes(filters.city.toLowerCase())
                      ).map(city => (
                        <div 
                          key={city} 
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                          onClick={() => handleSearch({ city, locality: '' })}
                        >
                          <FaMapMarkerAlt className="text-blue-500 mr-2" />
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Check-in/Check-out */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-2">Check-in / Check-out</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaCalendarAlt />
                  </span>
                  <div
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md bg-white cursor-pointer flex justify-between items-center"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <span>
                      {filters.checkin ? new Date(filters.checkin).toLocaleDateString() : 'Check-in'}
                      {' — '}
                      {filters.checkout ? new Date(filters.checkout).toLocaleDateString() : 'Check-out'}
                    </span>
                    <span className="text-sm text-gray-500">{calculateNights()} night{calculateNights() !== 1 ? 's' : ''}</span>
                  </div>
                  {showCalendar && (
                    <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-md shadow-lg z-20 p-4">
                      <div className="flex justify-between mb-4">
                        <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={flexibleDates}
                            onChange={() => setFlexibleDates(!flexibleDates)}
                            className="mr-2 accent-blue-500"
                          />
                          I'm flexible with dates
                        </label>
                        <button
                          className="text-blue-600 text-sm font-medium"
                          onClick={() => setShowCalendar(false)}
                        >
                          Close
                        </button>
                      </div>
                      {/* Calendar component would go here - simplified for this example */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-1">Check-in</label>
                          <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={filters.checkin}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => handleSearch({ checkin: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-1">Check-out</label>
                          <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={filters.checkout}
                            min={filters.checkin}
                            onChange={(e) => handleSearch({ checkout: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Guests */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Guests</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaUsers />
                  </span>
                  <div
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md bg-white cursor-pointer"
                    onClick={() => setShowGuestSelector(!showGuestSelector)}
                  >
                    {filters.guests.adults} adult{filters.guests.adults !== 1 ? 's' : ''}
                    {filters.guests.children > 0 && `, ${filters.guests.children} child${filters.guests.children !== 1 ? 'ren' : ''}`}
                    {' · '}
                    {filters.guests.rooms} room{filters.guests.rooms !== 1 ? 's' : ''}
                  </div>
                  {showGuestSelector && (
                    <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-md shadow-lg z-20 p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Adults</span>
                          <div className="flex items-center">
                            <button
                              className="w-8 h-8 flex items-center justify-center border rounded-full"
                              onClick={() => updateGuests('adults', Math.max(1, filters.guests.adults - 1))}
                              disabled={filters.guests.adults <= 1}
                            >
                              -
                            </button>
                            <span className="mx-3">{filters.guests.adults}</span>
                            <button
                              className="w-8 h-8 flex items-center justify-center border rounded-full"
                              onClick={() => updateGuests('adults', filters.guests.adults + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Children</span>
                          <div className="flex items-center">
                            <button
                              className="w-8 h-8 flex items-center justify-center border rounded-full"
                              onClick={() => updateGuests('children', Math.max(0, filters.guests.children - 1))}
                              disabled={filters.guests.children <= 0}
                            >
                              -
                            </button>
                            <span className="mx-3">{filters.guests.children}</span>
                            <button
                              className="w-8 h-8 flex items-center justify-center border rounded-full"
                              onClick={() => updateGuests('children', filters.guests.children + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Rooms</span>
                          <div className="flex items-center">
                            <button
                              className="w-8 h-8 flex items-center justify-center border rounded-full"
                              onClick={() => updateGuests('rooms', Math.max(1, filters.guests.rooms - 1))}
                              disabled={filters.guests.rooms <= 1}
                            >
                              -
                            </button>
                            <span className="mx-3">{filters.guests.rooms}</span>
                            <button
                              className="w-8 h-8 flex items-center justify-center border rounded-full"
                              onClick={() => updateGuests('rooms', Math.min(filters.guests.adults, filters.guests.rooms + 1))}
                              disabled={filters.guests.rooms >= filters.guests.adults}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          className="w-full p-2 bg-blue-600 text-white rounded-md"
                          onClick={() => setShowGuestSelector(false)}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-medium text-lg shadow-lg transition-colors flex items-center"
                onClick={() => {
                  handleSearch(filters);
                  
                  // Scroll to results
                  if (searchRef.current) {
                    window.scrollTo({
                      top: searchRef.current.offsetTop + searchRef.current.offsetHeight,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                <FaSearch className="mr-2" /> Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for search box overlap */}
      <div className="h-24"></div>
      
      {/* Main Content */}
      <section className="py-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar - desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-5 sticky top-5">
              <h3 className="font-bold text-lg border-b pb-3 mb-4">Filter by</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Your budget (per night)</h4>
                <div className="space-y-2">
                  {[
                    { min: 0, max: 2000, label: 'Under ₹2,000' },
                    { min: 2000, max: 5000, label: '₹2,000 - ₹5,000' },
                    { min: 5000, max: 10000, label: '₹5,000 - ₹10,000' },
                    { min: 10000, max: 20000, label: '₹10,000 - ₹20,000' },
                    { min: 20000, max: 50000, label: 'Above ₹20,000' }
                  ].map(range => (
                    <div key={range.label} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`price-${range.min}`} 
                        checked={filters.priceRange.min === range.min && filters.priceRange.max === range.max}
                        onChange={() => handlePriceRangeFilter(range.min, range.max)}
                        className="mr-2 accent-blue-600"
                      />
                      <label htmlFor={`price-${range.min}`} className="text-gray-700 text-sm">
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Star Rating */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Star Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`star-${star}`} 
                        checked={filters.starRating.includes(star)}
                        onChange={() => toggleStarRating(star)}
                        className="mr-2 accent-blue-600"
                      />
                      <label htmlFor={`star-${star}`} className="text-gray-700 text-sm flex items-center">
                        {Array(star).fill(0).map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 mr-0.5" />
                        ))}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Property Type */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Property Type</h4>
                <div className="space-y-2">
                  {hotelCategories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`type-${category.id}`} 
                        checked={filters.propertyType.includes(category.id)}
                        onChange={() => togglePropertyType(category.id)}
                        className="mr-2 accent-blue-600"
                      />
                      <label htmlFor={`type-${category.id}`} className="text-gray-700 text-sm">
                        {category.icon} {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Meal Plan */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Meal Plan</h4>
                <div className="space-y-2">
                  {['Breakfast included', 'All meals included', 'No meals'].map(meal => (
                    <div key={meal} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`meal-${meal}`} 
                        checked={filters.mealPlan === meal}
                        onChange={() => handleSearch({ mealPlan: filters.mealPlan === meal ? '' : meal })}
                        className="mr-2 accent-blue-600"
                      />
                      <label htmlFor={`meal-${meal}`} className="text-gray-700 text-sm">
                        {meal}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Property Amenities */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Property Amenities</h4>
                <div className="space-y-2">
                  {['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Fitness Center', 'Free Parking'].map(amenity => (
                    <div key={amenity} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`amenity-${amenity}`} 
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="mr-2 accent-blue-600"
                      />
                      <label htmlFor={`amenity-${amenity}`} className="text-gray-700 text-sm">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Cancellation Policy */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="free-cancellation" 
                    checked={filters.freeCancellation}
                    onChange={() => handleSearch({ freeCancellation: !filters.freeCancellation })}
                    className="mr-2 accent-blue-600"
                  />
                  <label htmlFor="free-cancellation" className="text-gray-700 text-sm">
                    Free cancellation
                  </label>
                </div>
              </div>
              
              {/* Payment Options */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="pay-at-property" 
                    checked={filters.payAtProperty}
                    onChange={() => handleSearch({ payAtProperty: !filters.payAtProperty })}
                    className="mr-2 accent-blue-600"
                  />
                  <label htmlFor="pay-at-property" className="text-gray-700 text-sm">
                    Pay at the property
                  </label>
                </div>
              </div>
              
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
                onClick={() => {
                  // Reset all filters except city and dates
                  handleSearch({
                    ...filters,
                    locality: '',
                    priceRange: { min: 0, max: 50000 },
                    starRating: [],
                    amenities: [],
                    propertyType: [],
                    mealPlan: '',
                    freeCancellation: false,
                    payAtProperty: false
                  });
                }}
              >
                Clear All Filters
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold">
                    {isLoading ? 'Searching...' : 
                      `${filteredHotels.length} properties found` + 
                      (filters.city ? ` in ${filters.city}` : '')}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {filters.checkin && filters.checkout ? 
                      `${new Date(filters.checkin).toLocaleDateString()} - ${new Date(filters.checkout).toLocaleDateString()} · ${calculateNights()} nights` : 
                      'Select dates to see availability'}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {/* Mobile Filter Button */}
                  <button 
                    className="lg:hidden px-4 py-2 border border-gray-300 rounded-md flex items-center"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                  >
                    <FaFilter className="mr-2" /> Filters
                  </button>
                  
                  {/* Map View Toggle */}
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md flex items-center"
                    onClick={() => setShowMap(!showMap)}
                  >
                    {showMap ? 'List View' : 'Map View'}
                  </button>
                  
                  {/* Sort Dropdown */}
                  <select 
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={sort}
                    onChange={(e) => sortHotels(e.target.value)}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price (low to high)</option>
                    <option value="price-high">Price (high to low)</option>
                    <option value="rating">Top Rated</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="distance">Distance from center</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <FaSpinner className="animate-spin text-4xl text-blue-600" />
              </div>
            )}
            
            {/* Map View */}
            {showMap && !isLoading && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6 h-[600px] relative">
                <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">Map view would be displayed here</p>
                  {/* In a real application, this would be a map component */}
                </div>
              </div>
            )}
            
            {/* No Results */}
            {!isLoading && filteredHotels.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => handleSearch({
                    priceRange: { min: 0, max: 50000 },
                    starRating: [],
                    amenities: [],
                    propertyType: [],
                    mealPlan: '',
                    freeCancellation: false,
                    payAtProperty: false
                  })}
                >
                  Clear Filters
                </button>
              </div>
            )}
            
            {/* Hotel List */}
            {!isLoading && !showMap && filteredHotels.length > 0 && (
              <div className="space-y-6">
                {filteredHotels.map(hotel => (
                  <div 
                    key={hotel.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    data-aos="fade-up"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Hotel Image */}
                      <div className="md:w-1/3 relative">
                        <img 
                          src={hotel.images[0]} 
                          alt={hotel.name} 
                          className="w-full h-60 md:h-full object-cover"
                        />
                        <button 
                          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(hotel.id);
                          }}
                        >
                          {favorites.includes(hotel.id) ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart />
                          )}
                        </button>
                        {hotel.dealType && (
                          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-md">
                            {hotel.dealType}
                          </div>
                        )}
                      </div>
                      
                      {/* Hotel Info */}
                      <div className="p-4 md:p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold hover:text-blue-600 cursor-pointer" onClick={() => setSelectedHotel(hotel)}>
                                {hotel.name}
                              </h3>
                              <div className="flex items-center mt-1">
                                {Array(hotel.starRating).fill(0).map((_, i) => (
                                  <FaStar key={i} className="text-yellow-400" />
                                ))}
                              </div>
                              <p className="text-gray-600 text-sm mt-1 flex items-center">
                                <FaMapMarkerAlt className="mr-1" /> {hotel.locality}, {hotel.city}
                              </p>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="flex items-center bg-blue-800 text-white px-2 py-1 rounded-lg">
                                <span className="font-bold text-sm mr-1">{hotel.rating}</span>
                                <span className="text-xs">{hotel.rating >= 4.5 ? 'Exceptional' : hotel.rating >= 4 ? 'Excellent' : hotel.rating >= 3.5 ? 'Very Good' : 'Good'}</span>
                              </div>
                              <span className="text-xs text-gray-500 mt-1">{hotel.reviewCount} reviews</span>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            {hotel.highlights && (
                              <div className="mb-2">
                                {hotel.highlights.slice(0, 2).map((highlight, i) => (
                                  <span key={i} className="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded mr-2 mb-1">
                                    {highlight}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              {hotel.amenities.slice(0, 4).map((amenity, i) => (
                                <span key={i} className="text-gray-600 text-sm flex items-center">
                                  <span className="mr-1">✓</span> {amenity.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {hotel.freeCancellation && (
                            <div className="mt-2 text-green-600 text-sm font-medium">
                              FREE cancellation • No prepayment needed
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between pt-3 border-t border-gray-100">
                          <div>
                            {hotel.discount > 0 && (
                              <div className="flex items-center">
                                <span className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded mr-2">
                                  -{hotel.discount}%
                                </span>
                                <span className="line-through text-gray-500 text-sm">
                                  {formatPrice(hotel.pricePerNight)}
                                </span>
                              </div>
                            )}
                            <div className="font-bold text-xl text-blue-700">
                              {formatPrice(hotel.discountedPrice || hotel.pricePerNight)}
                            </div>
                            <div className="text-gray-500 text-xs">per night • {calculateNights()} night{calculateNights() !== 1 ? 's' : ''}</div>
                          </div>
                          
                          <button
                            className="mt-3 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                            onClick={() => setSelectedHotel(hotel)}
                          >
                            See Availability
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hotel Detail Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={closeModal}></div>
            
            <div 
              className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              ref={modalRef}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md"
                onClick={closeModal}
              >
                ✕
              </button>
              
              {bookingStep === 1 ? (
                /* Hotel Details */
                <>
                  {/* Image Gallery */}
                  <div className="relative h-80">
                    <img 
                      src={selectedHotel.images[currentImageIndex]} 
                      alt={selectedHotel.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Image Navigation */}
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
                      onClick={prevImage}
                    >
                      <FaChevronLeft />
                    </button>
                    
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
                      onClick={nextImage}
                    >
                      <FaChevronRight />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                      {currentImageIndex + 1}/{selectedHotel.images.length}
                    </div>
                    
                    <button 
                      className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md"
                      onClick={() => toggleFavorite(selectedHotel.id)}
                    >
                      {favorites.includes(selectedHotel.id) ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </div>
                  
                  {/* Hotel Info */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedHotel.name}</h2>
                        <div className="flex items-center mt-1">
                          {Array(selectedHotel.starRating).fill(0).map((_, i) => (
                            <FaStar key={i} className="text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-600 mt-1">
                          <FaMapMarkerAlt className="inline mr-1" /> 
                          {selectedHotel.address}
                        </p>
                      </div>
                      
                      <div className="mt-4 md:mt-0">
                        <div className="flex items-center bg-blue-800 text-white px-3 py-2 rounded-lg">
                          <span className="font-bold mr-2">{selectedHotel.rating}</span>
                          <div className="text-sm">
                            <div>{selectedHotel.rating >= 4.5 ? 'Exceptional' : selectedHotel.rating >= 4 ? 'Excellent' : 'Very Good'}</div>
                            <div className="text-xs">{selectedHotel.reviewCount} reviews</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tabs */}
                    <div className="mt-6 border-b">
                      <div className="flex">
                        {['details', 'rooms', 'location', 'reviews', 'policies'].map(tab => (
                          <button 
                            key={tab}
                            className={`px-4 py-2 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            onClick={() => handleTabChange(tab)}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="py-6">
                      {activeTab === 'details' && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">About this property</h3>
                          <p className="text-gray-600 mb-4">
                            Luxury hotel with prime location and excellent amenities.
                          </p>
                          
                          <h4 className="font-semibold text-lg mt-6 mb-3">Highlights</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedHotel.highlights?.map((highlight, i) => (
                              <div key={i} className="flex items-start">
                                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                          
                          <h4 className="font-semibold text-lg mt-6 mb-3">Amenities</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {selectedHotel.amenities.map((amenity, i) => (
                              <div key={i} className="flex items-center">
                                <span className="text-blue-500 mr-2">✓</span>
                                {amenity.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'rooms' && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Available Rooms</h3>
                          <div className="space-y-6">
                            {selectedHotel.roomTypes.map(room => (
                              <div key={room.id} className="border rounded-lg overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-3">
                                  <div className="md:col-span-2 p-4">
                                    <h4 className="font-bold text-lg">{room.name}</h4>
                                    <p className="text-sm text-gray-600 mb-2">
                                      {room.size} • {room.beds} • {room.view}
                                    </p>
                                    <div className="mb-3">
                                      <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                        {room.occupancy.adults} adults, {room.occupancy.children} children
                                      </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                      {room.amenities.map((amenity, i) => (
                                        <div key={i} className="flex items-center text-sm">
                                          <FaCheck className="text-green-500 mr-1" />
                                          {amenity}
                                        </div>
                                      ))}
                                    </div>
                                    
                                    <div className="text-green-600 font-medium text-sm">
                                      {room.mealPlan}
                                    </div>
                                    <div className="text-blue-600 text-sm mt-1">
                                      {room.cancellationPolicy}
                                    </div>
                                  </div>
                                  
                                  <div className="bg-gray-50 p-4 flex flex-col justify-between">
                                    <div>
                                      <div className="text-sm text-gray-500">
                                        {room.totalRooms} rooms left at this price
                                      </div>
                                      <div className="text-xl font-bold text-blue-700 mt-1">
                                        {formatPrice(room.discountedPrice || room.pricePerNight)}
                                      </div>
                                      <div className="text-gray-500 text-xs">
                                        per night
                                      </div>
                                      <div className="text-gray-500 text-xs mt-1">
                                        {formatPrice((room.discountedPrice || room.pricePerNight) * calculateNights())} total
                                      </div>
                                      <div className="text-gray-500 text-xs mt-1">
                                        includes taxes & fees
                                      </div>
                                    </div>
                                    
                                    <button
                                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
                                      onClick={() => selectRoom(room)}
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'location' && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Location</h3>
                          <div className="h-64 bg-gray-200 mb-4 flex items-center justify-center">
                            <p className="text-gray-600">Map would be displayed here</p>
                          </div>
                          
                          <h4 className="font-semibold text-lg mt-6 mb-3">Nearby Attractions</h4>
                          <div className="space-y-2">
                            {selectedHotel.nearbyAttractions?.map((attraction, i) => (
                              <div key={i} className="flex justify-between">
                                <span>{attraction.name}</span>
                                <span className="text-gray-600">{attraction.distance}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'reviews' && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Guest Reviews</h3>
                          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-3xl font-bold">{selectedHotel.rating}</div>
                                <div className="text-sm text-gray-600">Based on {selectedHotel.reviewCount} reviews</div>
                              </div>
                              <div>
                                <div className="bg-blue-600 text-white px-3 py-1 rounded-lg">
                                  {selectedHotel.rating >= 4.5 ? 'Exceptional' : selectedHotel.rating >= 4 ? 'Excellent' : 'Very Good'}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            {selectedHotel.reviews?.map(review => (
                              <div key={review.id} className="border-b pb-4">
                                <div className="flex justify-between mb-2">
                                  <div className="font-medium">{review.userName}</div>
                                  <div className="text-gray-500 text-sm">{review.date}</div>
                                </div>
                                <div className="flex items-center mb-2">
                                  <div className="bg-blue-600 text-white text-sm px-2 py-0.5 rounded mr-2">
                                    {review.rating}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {review.tripType} • {review.stayDuration}
                                  </div>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'policies' && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Hotel Policies</h3>
                          <div className="space-y-4">
                            {selectedHotel.policies?.map((policy, i) => (
                              <div key={i} className="flex items-start">
                                <FaCheck className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                <span>{policy}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : bookingStep === 2 ? (
                /* Booking Form */
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Complete Your Booking</h2>
                  
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{selectedHotel.name}</h3>
                        <div className="text-sm text-gray-600">{selectedHotel.locality}, {selectedHotel.city}</div>
                        <div className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">{selectedRoom.name}</span>
                          {' • '}
                          {selectedRoom.mealPlan}
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Check-in:</span> {filters.checkin && new Date(filters.checkin).toLocaleDateString()}
                          {' • '}
                          <span className="font-medium">Check-out:</span> {filters.checkout && new Date(filters.checkout).toLocaleDateString()}
                          {' • '}
                          {calculateNights()} night(s)
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <div className="text-xl font-bold text-blue-700">
                          {formatPrice(selectedRoom.discountedPrice || selectedRoom.pricePerNight)}
                        </div>
                        <div className="text-gray-500 text-xs">
                          per night • {formatPrice((selectedRoom.discountedPrice || selectedRoom.pricePerNight) * calculateNights())} total
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleBookingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-bold text-lg mb-4">Guest Details</h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">First Name*</label>
                            <input
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={bookingForm.firstName}
                              onChange={(e) => setBookingForm({...bookingForm, firstName: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">Last Name*</label>
                            <input
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={bookingForm.lastName}
                              onChange={(e) => setBookingForm({...bookingForm, lastName: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-medium mb-1">Email*</label>
                          <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={bookingForm.email}
                            onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">Booking confirmation will be sent to this email</p>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-medium mb-1">Phone*</label>
                          <input
                            type="tel"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-medium mb-1">Special Requests</label>
                          <textarea
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows="4"
                            value={bookingForm.specialRequests}
                            onChange={(e) => setBookingForm({...bookingForm, specialRequests: e.target.value})}
                          ></textarea>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-lg mb-4">Payment Details</h3>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                          <div className="flex justify-between mb-2">
                            <span>{selectedRoom.name} x {calculateNights()} night(s)</span>
                            <span>{formatPrice((selectedRoom.discountedPrice || selectedRoom.pricePerNight) * calculateNights())}</span>
                          </div>
                          <div className="flex justify-between mb-2 text-green-600">
                            <span>Taxes and fees</span>
                            <span>Included</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg pt-2 border-t">
                            <span>Total</span>
                            <span>{formatPrice((selectedRoom.discountedPrice || selectedRoom.pricePerNight) * calculateNights())}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-medium mb-1">Payment Method</label>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="payment-card"
                                name="paymentMethod"
                                checked={bookingForm.paymentMethod === 'card'}
                                onChange={() => setBookingForm({...bookingForm, paymentMethod: 'card'})}
                                className="mr-2 accent-blue-600"
                              />
                              <label htmlFor="payment-card" className="text-gray-700">
                                Credit/Debit Card
                              </label>
                            </div>
                            
                            {selectedHotel.payAtProperty && (
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="payment-property"
                                  name="paymentMethod"
                                  checked={bookingForm.paymentMethod === 'property'}
                                  onChange={() => setBookingForm({...bookingForm, paymentMethod: 'property'})}
                                  className="mr-2 accent-blue-600"
                                />
                                <label htmlFor="payment-property" className="text-gray-700">
                                  Pay at the property
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {bookingForm.paymentMethod === 'card' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-gray-700 text-sm font-medium mb-1">Card Number</label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full p-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Expiry Date</label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">CVV</label>
                                <input
                                  type="text"
                                  placeholder="123"
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {error && (
                      <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md">
                        {error}
                      </div>
                    )}
                    
                    <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                      <button
                        type="button"
                        className="w-full md:w-auto px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
                        onClick={() => setBookingStep(1)}
                      >
                        Back
                      </button>
                      
                      <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          'Complete Booking'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Booking Confirmation */
                <div className="p-6 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheck className="text-green-600 text-3xl" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Your booking at {selectedHotel.name} has been confirmed. A confirmation
                    email has been sent to {bookingForm.email}.
                  </p>
                  
                  <div className="bg-blue-50 p-6 rounded-lg max-w-md mx-auto mb-6 text-left">
                    <h3 className="font-bold text-lg mb-4">Booking Details</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Booking Reference:</span>
                        <span>BK{Math.floor(Math.random() * 1000000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Check-in:</span>
                        <span>{filters.checkin && new Date(filters.checkin).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Check-out:</span>
                        <span>{filters.checkout && new Date(filters.checkout).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Room:</span>
                        <span>{selectedRoom.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Total:</span>
                        <span>{formatPrice((selectedRoom.discountedPrice || selectedRoom.pricePerNight) * calculateNights())}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={closeModal}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelBooking;
