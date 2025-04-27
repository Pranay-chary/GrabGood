import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaStar, FaMapMarkerAlt, FaUtensils, FaRegClock, FaUsers, FaPercent, FaCheckCircle, FaHeart, FaFilter } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Mock data for MVP (replace with API calls in production)
const cuisines = ["North Indian", "South Indian", "Chinese", "Italian", "Continental", "Fast Food", "Cafe", "Desserts", "Bakery"];

const localities = ["Koregaon Park", "Viman Nagar", "Baner", "Hinjewadi", "Camp", "Kothrud", "Aundh", "Shivaji Nagar"];

const offers = [
  { type: "FLAT", value: "50% OFF up to ₹100", code: "WELCOME50" },
  { type: "BOGO", value: "Buy 1 Get 1", code: "DINEOUTBOGO" },
  { type: "BANK", value: "20% off with HDFC Cards", code: "HDFC20" },
  { type: "FLAT", value: "40% OFF up to ₹200", code: "GRABFOOD40" },
  { type: "SPECIAL", value: "Free Dessert", code: "SWEETTREAT" }
];

const collections = [
  { 
    id: 1, 
    name: "Best of Pune", 
    description: "Curated list of the finest restaurants in Pune",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D"
  },
  { 
    id: 2, 
    name: "Happy Hours", 
    description: "Great deals on drinks and food",
    image: "https://images.unsplash.com/photo-1567696911980-2c473a522127?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  { 
    id: 3, 
    name: "Premium Dining", 
    description: "Luxury dining experiences",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5JTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D"
  },
  { 
    id: 4, 
    name: "Outdoor Seating", 
    description: "Enjoy the weather while you dine",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3V0ZG9vciUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D"
  },
];

// Mock data for MVP (replace with /api/bookings/restaurants fetch)
const restaurants = [
  {
    id: 1,
    name: 'Spice Haven',
    location: 'Koregaon Park, Pune',
    cuisine: ['North Indian', 'Mughlai'],
    price: 800,
    partySize: '2-20 guests',
    rating: 4.7,
    ratingCount: 450,
    distance: '3.2 km',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
    gallery: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1585937421612-70a008356c36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D',
      'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGluZGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D',
    ],
    offers: ['Flat 40% off bill', 'HDFC Card: 15% off', 'Free Mocktail'],
    offerCodes: ['WELCOME50', 'HDFC20'],
    menu: ['Butter Chicken', 'Paneer Tikka', 'Biryani', 'Naan'],
    reviews: '450 reviews',
    bookingCount: '200 times this week',
    mapUrl: 'https://maps.google.com/?q=Spice+Haven,Pune',
    whyLove: ['Romantic Ambiance', 'Quick Service', 'Authentic Flavors'],
    events: ['Sunday Brunch Buffet', 'Live Sufi Night'],
    coverCharge: 500,
    isPremium: true,
    slots: ['12:00 PM', '1:00 PM', '7:00 PM', '8:30 PM', '9:30 PM'],
    popularDishes: ['Butter Chicken', 'Dal Makhani', 'Paneer Tikka Masala'],
    amenities: ['Parking', 'Air Conditioning', 'Outdoor Seating', 'Full Bar'],
  },
  {
    id: 2,
    name: 'Ocean Breeze',
    location: 'Viman Nagar, Pune',
    cuisine: ['Seafood', 'Continental'],
    price: 1200,
    partySize: '4-30 guests',
    rating: 4.9,
    ratingCount: 320,
    distance: '5.1 km',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5JTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
    gallery: [
      'https://images.unsplash.com/photo-1535007829477-3f77742c3a0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNlYWZvb2R8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHNlYWZvb2R8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1595752024492-c8cbf15da01a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9ic3RlcnxlbnwwfHwwfHx8MA%3D%3D',
    ],
    offers: ['Free dessert with booking', 'HDFC Card: 10% off', '20% off for 6+ guests'],
    offerCodes: ['SWEETTREAT', 'HDFC20'],
    menu: ['Prawn Curry', 'Fish Fry', 'Grilled Lobster', 'Pasta'],
    reviews: '320 reviews',
    bookingCount: '120 times this week',
    mapUrl: 'https://maps.google.com/?q=Ocean+Breeze,Pune',
    whyLove: ['Seafront View', 'Fresh Ingredients', 'Live Music'],
    events: ['Seafood Festival', 'Rooftop Party'],
    coverCharge: 700,
    isPremium: true,
    slots: ['12:30 PM', '1:30 PM', '7:30 PM', '8:30 PM', '10:00 PM'],
    popularDishes: ['Grilled Lobster', 'Fish Curry', 'Seafood Platter'],
    amenities: ['Valet Parking', 'Air Conditioning', 'Rooftop Seating', 'Full Bar'],
  },
  {
    id: 3,
    name: 'Green Leaf',
    location: 'Baner, Pune',
    cuisine: ['Vegetarian', 'Jain'],
    price: 600,
    partySize: '2-15 guests',
    rating: 4.6,
    ratingCount: 250,
    distance: '4.8 km',
    image: 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZlZ2V0YXJpYW4lMjByZXN0YXVyYW50fGVufDB8fDB8fHww',
    gallery: [
      'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZlZ2V0YXJpYW4lMjBmb29kfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1625944525533-473f1a3d54eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZlZ2V0YXJpYW4lMjBmb29kfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHZlZ2V0YXJpYW4lMjBmb29kfGVufDB8fDB8fHww',
    ],
    offers: ['15% off for 4+ guests', 'Free Jain Dessert'],
    offerCodes: ['DINEOUTBOGO'],
    menu: ['Veg Biryani', 'Palak Paneer', 'Jain Pav Bhaji', 'Dosa'],
    reviews: '250 reviews',
    bookingCount: '90 times this week',
    mapUrl: 'https://maps.google.com/?q=Green+Leaf,Pune',
    whyLove: ['Jain Options', 'Cozy Ambiance', 'Budget-Friendly'],
    events: ['Veg Food Fest'],
    coverCharge: 0,
    isPremium: false,
    slots: ['11:30 AM', '1:00 PM', '2:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
    popularDishes: ['Pav Bhaji', 'Paneer Butter Masala', 'Special Thali'],
    amenities: ['Parking', 'Air Conditioning', 'Pure Vegetarian', 'Takeaway'],
  },
  {
    id: 4,
    name: 'Milano Pizzeria',
    location: 'Hinjewadi, Pune',
    cuisine: ['Italian', 'Pizza', 'Pasta'],
    price: 900,
    partySize: '2-12 guests',
    rating: 4.5,
    ratingCount: 380,
    distance: '7.2 km',
    image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emElMjByZXN0YXVyYW50fGVufDB8fDB8fHww',
    gallery: [
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emF8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1600628421055-4d30de868b8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBhc3RhfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1595854341625-f33e596b5969?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHJlc3RhdXJhbnQlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D',
    ],
    offers: ['BOGO on Pizzas', 'Complimentary Bruschetta', '25% off on weekdays'],
    offerCodes: ['GRABFOOD40', 'DINEOUTBOGO'],
    menu: ['Margherita Pizza', 'Pasta Carbonara', 'Tiramisu', 'Garlic Bread'],
    reviews: '380 reviews',
    bookingCount: '150 times this week',
    mapUrl: 'https://maps.google.com/?q=Milano+Pizzeria,Pune',
    whyLove: ['Authentic Italian', 'Wood-fired Oven', 'Kid-Friendly'],
    events: ['Wine & Dine Evenings'],
    coverCharge: 0,
    isPremium: false,
    slots: ['12:00 PM', '1:30 PM', '7:00 PM', '8:30 PM', '9:30 PM'],
    popularDishes: ['Margherita Pizza', 'Pasta Carbonara', 'Tiramisu'],
    amenities: ['Parking', 'Air Conditioning', 'Outdoor Seating', 'Takeaway'],
  },
  {
    id: 5,
    name: 'The Coffee House',
    location: 'Aundh, Pune',
    cuisine: ['Cafe', 'Desserts', 'Continental'],
    price: 500,
    partySize: '2-10 guests',
    rating: 4.2,
    ratingCount: 420,
    distance: '6.5 km',
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvZmZlZSUyMHNob3B8ZW58MHx8MHx8fDA%3D',
    gallery: [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1608649672519-e8971380c40b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc3NlcnRzfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZSUyMGludGVyaW9yfGVufDB8fDB8fHww',
    ],
    offers: ['Happy Hour: 50% off on coffee', 'Buy 1 Get 1 on desserts', 'Student Discount: 15% off'],
    offerCodes: ['WELCOME50', 'DINEOUTBOGO'],
    menu: ['Cappuccino', 'Cheesecake', 'Croissant', 'Avocado Toast'],
    reviews: '420 reviews',
    bookingCount: '180 times this week',
    mapUrl: 'https://maps.google.com/?q=The+Coffee+House,Pune',
    whyLove: ['Cozy Setting', 'Fast WiFi', 'Artisanal Coffee'],
    events: ['Open Mic Nights', 'Book Club Meetings'],
    coverCharge: 0,
    isPremium: false,
    slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'],
    popularDishes: ['Cappuccino', 'Chocolate Cheesecake', 'Breakfast Platter'],
    amenities: ['Free WiFi', 'Power Outlets', 'Outdoor Seating', 'Takeaway'],
  }
];

const RestaurantBooking = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    partySize: '',
    name: '',
    email: '',
    phone: '',
    specialRequest: '',
    preBookMeal: [],
    event: '',
    coverChargePaid: false,
  });
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('Trending');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    cuisines: [],
    offers: [],
    price: null,
    rating: null,
    location: '',
    sort: 'popularity'
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    // TODO: Fetch restaurants from /api/bookings/restaurants
    // axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/restaurants`)
    //   .then(res => setFilteredRestaurants(res.data))
    //   .catch(err => setError('Failed to load restaurants'));
    
    // Set today's date as default
    const today = new Date();
    setSelectedDate(today.toISOString().split('T')[0]);
  }, []);

  const handleSearch = (filters) => {
    const filtered = restaurants.filter(restaurant =>
      restaurant.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      (!filters.cuisine || restaurant.cuisine.some(c => c.toLowerCase().includes(filters.cuisine.toLowerCase()))) &&
      (!filters.partySize || restaurant.partySize.includes(filters.partySize)) &&
      (!filters.offer || restaurant.offers.some(offer => offer.toLowerCase().includes(filters.offer.toLowerCase())))
    );
    setFilteredRestaurants(filtered);
  };

  const handleFilter = (type) => {
    setFilterType(type);
    let filtered = restaurants;
    if (type === 'Offers') {
      filtered = restaurants.filter(r => r.offers.length > 0);
    } else if (type === 'Luxury Dining') {
      filtered = restaurants.filter(r => r.isPremium);
    } else if (type === 'Kid-Friendly') {
      filtered = restaurants.filter(r => r.whyLove.includes('Kid-Friendly') || r.partySize.includes('2-15'));
    } else if (type === 'Rooftop') {
      filtered = restaurants.filter(r => r.events.some(e => e.includes('Rooftop')));
    }
    setFilteredRestaurants(filtered);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setBookingForm(prev => ({...prev, time: slot}));
  };

  const toggleFilter = (filterType, value) => {
    setActiveFilters(prev => {
      const newFilters = {...prev};
      
      if (filterType === 'cuisines' || filterType === 'offers') {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        } else {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      } else {
        newFilters[filterType] = value;
      }
      
      return newFilters;
    });
    
    applyFilters();
  };

  const applyFilters = () => {
    let filtered = restaurants;
    
    // Apply cuisine filter
    if (activeFilters.cuisines.length > 0) {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine.some(cuisine => 
          activeFilters.cuisines.includes(cuisine)
        )
      );
    }
    
    // Apply offer filter
    if (activeFilters.offers.length > 0) {
      filtered = filtered.filter(restaurant => 
        restaurant.offerCodes.some(code => 
          activeFilters.offers.includes(code)
        )
      );
    }
    
    // Apply price filter
    if (activeFilters.price) {
      const [min, max] = activeFilters.price.split('-').map(Number);
      filtered = filtered.filter(restaurant => 
        restaurant.price >= min && (max ? restaurant.price <= max : true)
      );
    }
    
    // Apply rating filter
    if (activeFilters.rating) {
      filtered = filtered.filter(restaurant => 
        restaurant.rating >= Number(activeFilters.rating)
      );
    }
    
    // Apply location filter
    if (activeFilters.location) {
      filtered = filtered.filter(restaurant => 
        restaurant.location.includes(activeFilters.location)
      );
    }
    
    // Apply sorting
    if (activeFilters.sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (activeFilters.sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeFilters.sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }
    
    setFilteredRestaurants(filtered);
  };

  const handleCollectionSelect = (collectionId) => {
    setSelectedCollection(collectionId);
    // Here you would filter restaurants based on the collection
    // For now, let's just simulate it
    if (collectionId === 1) { // Best of Pune
      setFilteredRestaurants(restaurants.filter(r => r.rating >= 4.7));
    } else if (collectionId === 2) { // Happy Hours
      setFilteredRestaurants(restaurants.filter(r => r.offers.some(o => o.includes('off on drinks') || o.includes('Happy Hour'))));
    } else if (collectionId === 3) { // Premium Dining
      setFilteredRestaurants(restaurants.filter(r => r.isPremium));
    } else if (collectionId === 4) { // Outdoor Seating
      setFilteredRestaurants(restaurants.filter(r => r.amenities.includes('Outdoor Seating')));
    } else {
      setFilteredRestaurants(restaurants);
    }
  };

  const toggleFavorite = (restaurantId) => {
    if (favorites.includes(restaurantId)) {
      setFavorites(favorites.filter(id => id !== restaurantId));
    } else {
      setFavorites([...favorites, restaurantId]);
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    return `₹${price} for two`;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingForm.date || !bookingForm.time || !bookingForm.partySize || !bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      setError('All fields are required');
      return;
    }
    if (selectedRestaurant.coverCharge > 0 && !bookingForm.coverChargePaid) {
      setError('Please pay the cover charge to confirm your booking');
      return;
    }
    try {
      // await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, {
      //   restaurantId: selectedRestaurant.id,
      //   ...bookingForm,
      // });
      alert('Table reserved! Check your email for confirmation.');
      setBookingForm({
        date: '',
        time: '',
        partySize: '',
        name: '',
        email: '',
        phone: '',
        specialRequest: '',
        preBookMeal: [],
        event: '',
        coverChargePaid: false,
      });
      setSelectedRestaurant(null);
      setPaymentStatus(null);
      setError('');
    } catch (err) {
      setError('Error reserving table');
    }
  };

  const handlePreBookMeal = (item) => {
    setBookingForm(prev => ({
      ...prev,
      preBookMeal: prev.preBookMeal.includes(item)
        ? prev.preBookMeal.filter(i => i !== item)
        : [...prev.preBookMeal, item],
    }));
  };

  const handleCoverChargePayment = async () => {
    try {
      // Mock Razorpay payment (replace with actual Razorpay integration)
      // const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/razorpay`, {
      //   amount: selectedRestaurant.coverCharge,
      //   restaurantId: selectedRestaurant.id,
      // });
      // if (response.data.success) {
        setBookingForm(prev => ({ ...prev, coverChargePaid: true }));
        setPaymentStatus('Payment successful! Your cover charge is confirmed.');
      // } else {
      //   setPaymentStatus('Payment failed. Please try again.');
      // }
    } catch (err) {
      setPaymentStatus('Error processing payment.');
    }
  };

  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gray-900 text-white py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-75"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4">GrabGood Dineout</h1>
          <p className="text-xl mb-8">Book tables at top restaurants with exclusive offers & experiences</p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-1">Location</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaMapMarkerAlt />
                  </span>
                  <input
                    type="text"
                    placeholder="Pune"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) => handleSearch({ location: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Party Size</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setBookingForm({...bookingForm, partySize: e.target.value})}
                >
                  <option value="">Select guests</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i+1}>{i+1} {i === 0 ? 'guest' : 'guests'}</option>
                  ))}
                  <option value="10+">10+ guests</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Cuisine</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => toggleFilter('cuisines', e.target.value)}
                >
                  <option value="">All cuisines</option>
                  {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Banner */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto">
            <div className="flex space-x-4 py-2">
              {offers.map((offer, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg w-64"
                  onClick={() => toggleFilter('offers', offer.code)}
                >
                  <div className="text-sm font-semibold">{offer.type}</div>
                  <div className="text-lg font-bold mt-1">{offer.value}</div>
                  <div className="mt-2 text-xs bg-white bg-opacity-20 inline-block px-2 py-1 rounded">
                    {offer.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Collections</h2>
          <p className="text-gray-600 mb-6">Explore curated lists of top restaurants, cafes, pubs, and bars in Pune</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <div 
                key={collection.id}
                className="relative rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105"
                onClick={() => handleCollectionSelect(collection.id)}
              >
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-bold text-lg">{collection.name}</h3>
                  <p className="text-sm">{collection.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCollection 
                ? collections.find(c => c.id === selectedCollection)?.name 
                : filterType === 'Trending' ? 'Popular Restaurants in Pune' : `${filterType} Restaurants`}
        </h2>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <FaFilter />
                <span>Filters</span>
              </button>
              
              <select 
                onChange={(e) => toggleFilter('sort', e.target.value)}
                className="bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Cuisines</h3>
                  <div className="space-y-2">
                    {cuisines.map(cuisine => (
                      <div key={cuisine} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`cuisine-${cuisine}`}
                          checked={activeFilters.cuisines.includes(cuisine)}
                          onChange={() => toggleFilter('cuisines', cuisine)}
                          className="mr-2 accent-orange-500"
                        />
                        <label htmlFor={`cuisine-${cuisine}`}>{cuisine}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Offers</h3>
                  <div className="space-y-2">
                    {offers.map(offer => (
                      <div key={offer.code} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`offer-${offer.code}`}
                          checked={activeFilters.offers.includes(offer.code)}
                          onChange={() => toggleFilter('offers', offer.code)}
                          className="mr-2 accent-orange-500"
                        />
                        <label htmlFor={`offer-${offer.code}`}>{offer.value}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Price Range</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="price-all" 
                          name="price"
                          checked={!activeFilters.price}
                          onChange={() => toggleFilter('price', null)}
                          className="mr-2 accent-orange-500"
                        />
                        <label htmlFor="price-all">All</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="price-1" 
                          name="price"
                          checked={activeFilters.price === '0-500'}
                          onChange={() => toggleFilter('price', '0-500')}
                          className="mr-2 accent-orange-500"
                        />
                        <label htmlFor="price-1">Under ₹500</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="price-2" 
                          name="price"
                          checked={activeFilters.price === '500-1000'}
                          onChange={() => toggleFilter('price', '500-1000')}
                          className="mr-2 accent-orange-500"
                        />
                        <label htmlFor="price-2">₹500 - ₹1000</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="price-3" 
                          name="price"
                          checked={activeFilters.price === '1000-1500'}
                          onChange={() => toggleFilter('price', '1000-1500')}
                          className="mr-2 accent-orange-500"
                        />
                        <label htmlFor="price-3">₹1000 - ₹1500</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="price-4" 
                          name="price"
                          checked={activeFilters.price === '1500-'}
                          onChange={() => toggleFilter('price', '1500-')}
                          className="mr-2 accent-orange-500"
                        />
                        <label htmlFor="price-4">₹1500+</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Rating</h3>
                    <div className="space-y-2">
                      {[4.5, 4, 3.5, 3].map(rating => (
                        <div key={rating} className="flex items-center">
                          <input 
                            type="radio" 
                            id={`rating-${rating}`}
                            name="rating"
                            checked={activeFilters.rating === rating.toString()}
                            onChange={() => toggleFilter('rating', rating.toString())}
                            className="mr-2 accent-orange-500"
                          />
                          <label htmlFor={`rating-${rating}`}>{rating}+ ★</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Restaurant Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
              <div 
              key={restaurant.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  
                <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(restaurant.id);
                    }}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                  >
                    <FaHeart className={favorites.includes(restaurant.id) ? "text-red-500" : "text-gray-300"} />
                </button>
                  
                  {restaurant.offers.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                      <div className="flex items-center text-white space-x-2">
                        <FaPercent className="text-yellow-400" />
                        <span className="text-sm font-medium">{restaurant.offers[0]}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                    <div className="flex items-center bg-green-700 text-white px-2 py-1 rounded">
                      <span className="mr-1">{restaurant.rating}</span>
                      <FaStar className="text-xs" />
                    </div>
                  </div>
                  
                  <div className="text-gray-600 mb-2">{restaurant.cuisine.join(', ')}</div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-gray-700">{formatPrice(restaurant.price)}</div>
                    <div className="text-gray-500 text-sm">{restaurant.distance}</div>
                  </div>
                  
                  {restaurant.bookingCount && (
                    <div className="text-sm text-gray-500 mb-3">
                      <FaCheckCircle className="inline mr-1 text-green-500" />
                      Booked {restaurant.bookingCount}
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <h4 className="font-medium mb-2">Available slots today:</h4>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.slots.map(slot => (
                <button
                          key={slot}
                          onClick={() => {
                            setSelectedRestaurant(restaurant);
                            handleSlotSelect(slot);
                          }}
                          className="bg-orange-50 text-orange-700 border border-orange-200 rounded px-3 py-1 text-sm hover:bg-orange-100"
                        >
                          {slot}
                </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
          ))}
          </div>
        </div>
      </section>

      {/* Restaurant Booking Modal */}
      {selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className="rounded-t-xl"
            >
              {selectedRestaurant.gallery.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`${selectedRestaurant.name} gallery ${index + 1}`}
                      className="w-full h-64 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
              
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
              <div>
                  <h2 className="text-2xl font-bold">{selectedRestaurant.name}</h2>
                  <p className="text-gray-600">{selectedRestaurant.cuisine.join(', ')} • {selectedRestaurant.location}</p>
                </div>
                <div className="flex items-center bg-green-700 text-white px-2 py-1 rounded">
                  <span className="mr-1">{selectedRestaurant.rating}</span>
                  <FaStar className="text-xs" />
                  <span className="ml-1 text-xs">({selectedRestaurant.ratingCount})</span>
                </div>
              </div>
              
              {selectedRestaurant.offers.length > 0 && (
                <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <FaPercent className="mr-2 text-orange-500" />
                    Available Offers
                  </h3>
                  <ul className="space-y-2">
                    {selectedRestaurant.offers.map((offer, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheckCircle className="text-orange-500 mt-1 mr-2" />
                        <span>{offer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Reservation Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-3">
                      <div className="flex items-center">
                        <FaRegClock className="mr-2 text-gray-500" />
                        <span>Date & Time</span>
                      </div>
                      <div className="font-medium">
                        {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Select date'} 
                        {selectedSlot ? `, ${selectedSlot}` : ''}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <FaUsers className="mr-2 text-gray-500" />
                        <span>Guests</span>
                  </div>
                      <div className="font-medium">
                        {bookingForm.partySize || 'Select guests'}
              </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Select Time</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRestaurant.slots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => handleSlotSelect(slot)}
                          className={`px-3 py-1 rounded text-sm border ${
                            selectedSlot === slot 
                              ? 'bg-orange-500 text-white border-orange-500' 
                              : 'border-gray-300 hover:border-orange-500'
                          }`}
                        >
                          {slot}
                        </button>
                  ))}
                </div>
              </div>
            </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">About Restaurant</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FaUtensils className="mt-1 mr-3 text-gray-500" />
                      <div>
                        <div className="font-medium">Popular Dishes</div>
                        <div className="text-sm text-gray-600">{selectedRestaurant.popularDishes.join(', ')}</div>
                </div>
                    </li>
                    <li className="flex items-start">
                      <FaMapMarkerAlt className="mt-1 mr-3 text-gray-500" />
                <div>
                        <div className="font-medium">Address</div>
                        <div className="text-sm text-gray-600">{selectedRestaurant.location}</div>
                        <a 
                          href={selectedRestaurant.mapUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-orange-500 hover:underline"
                        >
                          View on map
                        </a>
                </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1 mr-3 text-gray-500">₹</span>
                <div>
                        <div className="font-medium">Cost</div>
                        <div className="text-sm text-gray-600">{formatPrice(selectedRestaurant.price)}</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Guest Details</h3>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                    {error}
                </div>
              )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-1 font-medium">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., +91 9876543210"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="specialRequest" className="block mb-1 font-medium">Special Requests (Optional)</label>
                <textarea
                  id="specialRequest"
                  value={bookingForm.specialRequest}
                  onChange={(e) => setBookingForm({ ...bookingForm, specialRequest: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Birthday celebration, window seat preference"
                  rows="3"
                />
              </div>
                
              {selectedRestaurant.coverCharge > 0 && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                <div>
                        <h4 className="font-medium">Cover Charge</h4>
                        <p className="text-sm text-gray-600">₹{selectedRestaurant.coverCharge} per person (ensures guaranteed seating)</p>
                      </div>
                  <button
                    type="button"
                    onClick={handleCoverChargePayment}
                        className={`px-4 py-2 rounded-lg ${
                      bookingForm.coverChargePaid
                        ? 'bg-green-500 text-white'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                    disabled={bookingForm.coverChargePaid}
                  >
                        {bookingForm.coverChargePaid ? 'Paid' : 'Pay Now'}
                  </button>
                    </div>
                    {paymentStatus && (
                      <p className={`mt-2 text-sm ${paymentStatus.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                        {paymentStatus}
                      </p>
                    )}
                </div>
              )}
                
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
                >
                    Confirm Reservation
                </button>
                <Link
                  to="/donations"
                    className="text-orange-500 hover:underline"
                >
                    Learn about our food donation program
                </Link>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantBooking;