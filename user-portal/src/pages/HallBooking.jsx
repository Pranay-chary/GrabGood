import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaCheck, FaArrowRight, FaPhoneAlt, FaClock, FaWifi, FaParking, FaUtensils, FaMusic, FaCamera, FaSearch, FaPercent, FaFilter } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Event types
const eventTypes = [
  { id: 'wedding', name: 'Wedding', icon: '💍' },
  { id: 'corporate', name: 'Corporate Event', icon: '🏢' },
  { id: 'birthday', name: 'Birthday Party', icon: '🎂' },
  { id: 'reception', name: 'Reception', icon: '🎊' },
  { id: 'conference', name: 'Conference', icon: '🎤' },
  { id: 'product-launch', name: 'Product Launch', icon: '🚀' },
  { id: 'cultural', name: 'Cultural Events', icon: '🎭' },
  { id: 'engagement', name: 'Engagement', icon: '💐' },
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
  "Lucknow"
];

// Popular localities by city
const localities = {
  'Mumbai': ['Juhu', 'Bandra', 'Andheri', 'Worli', 'Malad'],
  'Delhi': ['Connaught Place', 'Nehru Place', 'Dwarka', 'Chattarpur', 'Aerocity'],
  'Bangalore': ['Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'MG Road'],
  'Pune': ['Koregaon Park', 'Viman Nagar', 'Baner', 'Hinjewadi', 'Kothrud'],
  'Hyderabad': ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Hitech City', 'Secunderabad'],
  'Chennai': ['T. Nagar', 'Nungambakkam', 'Anna Nagar', 'Adyar', 'Velachery'],
  'Kolkata': ['Park Street', 'Salt Lake', 'New Town', 'Ballygunge', 'Alipore'],
  'Ahmedabad': ['Navrangpura', 'Bodakdev', 'SG Highway', 'Satellite', 'Prahlad Nagar'],
  'Jaipur': ['Malviya Nagar', 'C Scheme', 'Vaishali Nagar', 'Mansarovar', 'Jagatpura'],
  'Lucknow': ['Gomti Nagar', 'Hazratganj', 'Indira Nagar', 'Aliganj', 'Mahanagar']
};

// Enhanced hall data with more details
const halls = [
  {
    id: 1,
    name: 'Pune Grand Banquet',
    city: 'Pune',
    locality: 'Kothrud',
    location: 'Kothrud, Pune',
    address: '123 Paud Road, Kothrud, Pune - 411038',
    price: '₹50,000/day',
    basePrice: 50000,
    minPrice: 1500, // per plate
    capacity: '500',
    minGuests: 100,
    maxGuests: 500,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFucXVldCUyMGhhbGx8ZW58MHx8MHx8fDA%3D',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFucXVldCUyMGhhbGx8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhbnF1ZXQlMjBoYWxsfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhdGVyaW5nfGVufDB8fDB8fHww',
    ],
    isPromoted: true,
    discount: 20, // percentage
    virtualTour: 'https://example.com/virtual-tour/1',
    totalSpaces: 3,
    spaces: [
      { name: 'Main Hall', capacity: 500, size: '10,000 sq ft', isIndoor: true },
      { name: 'Garden Area', capacity: 300, size: '5,000 sq ft', isIndoor: false },
      { name: 'Pre-Function Area', capacity: 100, size: '2,000 sq ft', isIndoor: true }
    ],
    amenities: [
      { name: 'Air Conditioning', icon: '❄️', included: true },
      { name: 'Parking', icon: '🅿️', included: true },
      { name: 'In-house Catering', icon: '🍽️', included: true },
      { name: 'DJ', icon: '🎵', included: true },
      { name: 'Decoration', icon: '🎊', included: true },
      { name: 'Valet', icon: '🚗', included: true },
      { name: 'Wi-Fi', icon: '📶', included: true },
      { name: 'Power Backup', icon: '⚡', included: true },
    ],
    veg_menu: [
      { name: 'Standard Veg Package', price: 1500, items: 15 },
      { name: 'Premium Veg Package', price: 2000, items: 20 },
      { name: 'Luxury Veg Package', price: 2500, items: 25 }
    ],
    nonveg_menu: [
      { name: 'Standard Non-Veg Package', price: 1800, items: 15 },
      { name: 'Premium Non-Veg Package', price: 2300, items: 20 },
      { name: 'Luxury Non-Veg Package', price: 2800, items: 25 }
    ],
    packages: [
      { 
        name: 'Basic', 
        price: 50000, 
        includes: ['Venue', 'Basic Decoration', 'Parking'],
        excludes: ['DJ', 'Photography', 'Premium Catering']
      },
      { 
        name: 'Premium', 
        price: 75000, 
        includes: ['Venue', 'Premium Decoration', 'Catering', 'DJ', 'Valet'],
        excludes: ['Photography', 'After Party']
      },
      { 
        name: 'Luxury', 
        price: 100000, 
        includes: ['Venue', 'Luxury Decoration', 'Premium Catering', 'DJ', 'Photography'],
        excludes: []
      },
    ],
    availableDates: [
      "2023-12-01",
      "2023-12-02",
      "2023-12-05",
      "2023-12-08",
      "2023-12-10"
    ],
    description: 'A luxurious banquet hall perfect for weddings and corporate events. Features modern amenities and elegant decor with multiple spaces to accommodate different functions.',
    policies: [
      'No outside catering allowed',
      'Advance booking required with 50% payment',
      'Cancellation policy: 100% refund 30 days prior, 50% refund 15 days prior, no refund after that',
      'Music allowed until 10:00 PM'
    ],
    faq: [
      { question: 'Is outside alcohol permitted?', answer: 'Yes, with corkage fee' },
      { question: 'Do you provide accommodation?', answer: 'No, but we can recommend nearby hotels' },
      { question: 'Is there a minimum guest requirement?', answer: 'Yes, minimum 100 guests' }
    ],
    availableFor: ['Wedding', 'Corporate Event', 'Birthday Party', 'Reception'],
    timing: '9:00 AM - 11:00 PM',
    similar: [2, 3]
  },
  {
    id: 2,
    name: 'Mumbai Royal Palace',
    city: 'Mumbai',
    locality: 'Juhu',
    location: 'Juhu, Mumbai',
    address: '456 Juhu Beach Road, Juhu, Mumbai - 400049',
    price: '₹1,20,000/day',
    basePrice: 120000,
    minPrice: 2000, // per plate
    capacity: '1000',
    minGuests: 200,
    maxGuests: 1000,
    rating: 4.9,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1593953443285-a518714b553f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGJhbnF1ZXQlMjBoYWxsfGVufDB8fDB8fHww',
    images: [
      'https://images.unsplash.com/photo-1593953443285-a518714b553f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGJhbnF1ZXQlMjBoYWxsfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGx1eHVyeSUyMGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1508163356824-03f81a9d8d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNlYSUyMHZpZXd8ZW58MHx8MHx8fDA%3D',
    ],
    isPromoted: true,
    discount: 15, // percentage
    virtualTour: 'https://example.com/virtual-tour/2',
    totalSpaces: 4,
    spaces: [
      { name: 'Grand Ballroom', capacity: 1000, size: '15,000 sq ft', isIndoor: true },
      { name: 'Sea View Lawn', capacity: 500, size: '8,000 sq ft', isIndoor: false },
      { name: 'Banquet Hall', capacity: 300, size: '6,000 sq ft', isIndoor: true },
      { name: 'Rooftop Terrace', capacity: 200, size: '4,000 sq ft', isIndoor: false }
    ],
    amenities: [
      { name: 'Sea View', icon: '🌊', included: true },
      { name: 'Valet', icon: '🚗', included: true },
      { name: 'Premium Catering', icon: '🍽️', included: true },
      { name: 'DJ', icon: '🎵', included: true },
      { name: 'Decoration', icon: '🎊', included: true },
      { name: '5-Star Service', icon: '⭐', included: true },
      { name: 'Wi-Fi', icon: '📶', included: true },
      { name: 'Bridal Room', icon: '👰', included: true },
    ],
    veg_menu: [
      { name: 'Royal Veg Package', price: 2000, items: 18 },
      { name: 'Grand Veg Package', price: 2500, items: 24 },
      { name: 'Maharaja Veg Package', price: 3000, items: 30 }
    ],
    nonveg_menu: [
      { name: 'Royal Non-Veg Package', price: 2300, items: 18 },
      { name: 'Grand Non-Veg Package', price: 2800, items: 24 },
      { name: 'Maharaja Non-Veg Package', price: 3300, items: 30 }
    ],
    packages: [
      { 
        name: 'Classic', 
        price: 120000, 
        includes: ['Venue', 'Basic Decoration', 'Valet'],
        excludes: ['Premium Catering', 'DJ', 'Photography'] 
      },
      { 
        name: 'Royal', 
        price: 180000, 
        includes: ['Venue', 'Premium Decoration', 'Catering', 'DJ'],
        excludes: ['Photography', 'After Party']
      },
      { 
        name: 'Maharaja', 
        price: 250000, 
        includes: ['Venue', 'Luxury Decoration', 'Premium Catering', 'Entertainment'],
        excludes: []
      },
    ],
    availableDates: [
      "2023-12-03",
      "2023-12-04",
      "2023-12-07",
      "2023-12-09",
      "2023-12-12"
    ],
    description: 'Luxury seaside venue with panoramic views of the Arabian Sea. Perfect for grand weddings and high-profile events with multiple spaces for different functions.',
    policies: [
      'Premium catering only',
      '50% advance required at booking',
      'Noise restrictions after 10 PM',
      'Cancellation policy: Full refund 45 days prior, 50% refund 30 days prior, no refund after that'
    ],
    faq: [
      { question: 'Is there a separate space for ceremonies?', answer: 'Yes, we have dedicated spaces for different ceremonies' },
      { question: 'Do you provide wedding planning services?', answer: 'Yes, we have in-house wedding planners' },
      { question: 'Is there accommodation available?', answer: 'Yes, we have 25 luxury rooms' }
    ],
    availableFor: ['Wedding', 'Corporate Event', 'Celebrity Events', 'Reception'],
    timing: '8:00 AM - 12:00 AM',
    similar: [1, 4]
  },
  {
    id: 3,
    name: 'Bangalore Tech Gardens',
    city: 'Bangalore',
    locality: 'Electronic City',
    location: 'Electronic City, Bangalore',
    address: '789 Tech Park Road, Electronic City, Bangalore - 560100',
    price: '₹80,000/day',
    basePrice: 80000,
    minPrice: 1800, // per plate
    capacity: '600',
    minGuests: 100,
    maxGuests: 600,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1544450804-94c0d1b6185f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNvbmZlcmVuY2UlMjBoYWxsfGVufDB8fDB8fHww',
    images: [
      'https://images.unsplash.com/photo-1544450804-94c0d1b6185f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNvbmZlcmVuY2UlMjBoYWxsfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1603201667141-5a2d4c673378?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdhcmRlbiUyMGV2ZW50fGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D',
    ],
    isPromoted: false,
    discount: 10, // percentage
    virtualTour: 'https://example.com/virtual-tour/3',
    totalSpaces: 3,
    spaces: [
      { name: 'Modern Hall', capacity: 600, size: '8,000 sq ft', isIndoor: true },
      { name: 'Garden Area', capacity: 400, size: '6,000 sq ft', isIndoor: false },
      { name: 'Conference Room', capacity: 200, size: '3,000 sq ft', isIndoor: true }
    ],
    amenities: [
      { name: 'Smart Lighting', icon: '💡', included: true },
      { name: 'High-Speed Wi-Fi', icon: '📶', included: true },
      { name: 'AV Equipment', icon: '🔊', included: true },
      { name: 'Garden', icon: '🌳', included: true },
      { name: 'Conference Facilities', icon: '💼', included: true },
      { name: 'Catering', icon: '🍽️', included: true },
      { name: 'Parking', icon: '🅿️', included: true },
      { name: 'Technical Support', icon: '🖥️', included: true },
    ],
    veg_menu: [
      { name: 'Tech Basic Veg', price: 1800, items: 15 },
      { name: 'Premium Veg', price: 2200, items: 20 },
      { name: 'Executive Veg', price: 2500, items: 25 }
    ],
    nonveg_menu: [
      { name: 'Tech Basic Non-Veg', price: 2000, items: 15 },
      { name: 'Premium Non-Veg', price: 2400, items: 20 },
      { name: 'Executive Non-Veg', price: 2700, items: 25 }
    ],
    packages: [
      { 
        name: 'Tech Basic', 
        price: 80000, 
        includes: ['Venue', 'AV Setup', 'Wi-Fi'],
        excludes: ['Catering', 'Event Planning', 'Decoration']
      },
      { 
        name: 'Corporate Plus', 
        price: 120000, 
        includes: ['Venue', 'Full Tech Setup', 'Catering', 'Event Support'],
        excludes: ['Premium Decoration', 'Entertainment']
      },
      { 
        name: 'Premium Event', 
        price: 150000, 
        includes: ['Venue', 'Complete Solution', 'Premium Catering', 'Event Planning'],
        excludes: []
      },
    ],
    availableDates: [
      "2023-12-01",
      "2023-12-03",
      "2023-12-06",
      "2023-12-08",
      "2023-12-15"
    ],
    description: 'Modern venue with state-of-the-art facilities, perfect for corporate events and tech conferences. Includes high-speed connectivity and advanced presentation systems.',
    policies: [
      'Tech support included in all packages',
      'Flexible booking terms with 30% advance',
      'Green event guidelines to be followed',
      'Cancellation policy: Full refund 20 days prior, 50% refund 10 days prior'
    ],
    faq: [
      { question: 'Can we bring our own tech equipment?', answer: 'Yes, but we recommend using our state-of-the-art systems' },
      { question: 'Is there dedicated internet bandwidth for events?', answer: 'Yes, up to 1 Gbps dedicated line available' },
      { question: 'Do you provide video conferencing facilities?', answer: 'Yes, with global connectivity options' }
    ],
    availableFor: ['Corporate Event', 'Conference', 'Product Launch', 'Award Ceremony'],
    timing: '7:00 AM - 11:00 PM',
    similar: [1, 4]
  },
  {
    id: 4,
    name: 'Delhi Heritage Mahal',
    city: 'Delhi',
    locality: 'Chattarpur',
    location: 'Chattarpur, Delhi',
    address: '123 Heritage Lane, Chattarpur, Delhi - 110074',
    price: '₹1,50,000/day',
    basePrice: 150000,
    minPrice: 2500, // per plate
    capacity: '1200',
    minGuests: 300,
    maxGuests: 1200,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1605544592370-cfdf54045ae0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGluZGlhbiUyMHdlZGRpbmclMjB2ZW51ZXxlbnwwfHwwfHx8MA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1605544592370-cfdf54045ae0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGluZGlhbiUyMHdlZGRpbmclMjB2ZW51ZXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1571587506278-24fae6b45855?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGluZGlhbiUyMHdlZGRpbmd8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1589843727768-c5ab7865ba1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGx1eHVyeSUyMGdhcmRlbnxlbnwwfHwwfHx8MA%3D%3D',
    ],
    isPromoted: true,
    discount: 5, // percentage
    virtualTour: 'https://example.com/virtual-tour/4',
    totalSpaces: 5,
    spaces: [
      { name: 'Main Palace', capacity: 1200, size: '20,000 sq ft', isIndoor: true },
      { name: 'Royal Garden', capacity: 800, size: '15,000 sq ft', isIndoor: false },
      { name: 'Heritage Hall', capacity: 500, size: '8,000 sq ft', isIndoor: true },
      { name: 'Poolside Area', capacity: 300, size: '5,000 sq ft', isIndoor: false },
      { name: 'Maharaja Suite', capacity: 100, size: '2,000 sq ft', isIndoor: true }
    ],
    amenities: [
      { name: 'Heritage Architecture', icon: '🏰', included: true },
      { name: 'Massive Gardens', icon: '🌳', included: true },
      { name: 'Royal Catering', icon: '🍽️', included: true },
      { name: 'Valet', icon: '🚗', included: true },
      { name: 'Luxury Suites', icon: '🛏️', included: true },
      { name: 'Traditional Welcome', icon: '🙏', included: true },
      { name: 'Horse Carriage', icon: '🐎', included: true },
      { name: 'Fireworks', icon: '🎆', included: true },
    ],
    veg_menu: [
      { name: 'Heritage Veg', price: 2500, items: 20 },
      { name: 'Royal Veg Feast', price: 3000, items: 25 },
      { name: 'Imperial Veg Spread', price: 3500, items: 30 }
    ],
    nonveg_menu: [
      { name: 'Heritage Non-Veg', price: 2800, items: 20 },
      { name: 'Royal Non-Veg Feast', price: 3300, items: 25 },
      { name: 'Imperial Non-Veg Spread', price: 3800, items: 30 }
    ],
    packages: [
      { 
        name: 'Heritage', 
        price: 150000, 
        includes: ['Venue', 'Basic Decor', 'Valet'],
        excludes: ['Premium Catering', 'Entertainment', 'Luxury Suites']
      },
      { 
        name: 'Royal Wedding', 
        price: 250000, 
        includes: ['Venue', 'Royal Decor', 'Premium Catering', 'Entertainment'],
        excludes: ['Luxury Suites', 'Fireworks']
      },
      { 
        name: 'Grand Celebration', 
        price: 350000, 
        includes: ['Venue', 'Luxury Experience', 'Complete Event Management'],
        excludes: []
      },
    ],
    availableDates: [
      "2023-12-02",
      "2023-12-05",
      "2023-12-08",
      "2023-12-10",
      "2023-12-15"
    ],
    description: 'A magnificent heritage property offering royal experience with modern amenities. The perfect blend of tradition and luxury for grand weddings and cultural events.',
    policies: [
      'Heritage guidelines must be followed',
      'Professional event planners required',
      '60% advance booking required',
      'Cancellation policy: 75% refund 60 days prior, 50% refund 45 days prior, no refund after that'
    ],
    faq: [
      { question: 'Is there accommodation for guests?', answer: 'Yes, we have 40 luxury suites on the property' },
      { question: 'Can we conduct traditional ceremonies?', answer: 'Yes, we have dedicated spaces for all traditional ceremonies' },
      { question: 'Do you provide traditional decorations?', answer: 'Yes, our in-house decorators specialize in traditional and fusion themes' }
    ],
    availableFor: ['Wedding', 'Reception', 'Corporate Event', 'Cultural Events'],
    timing: '6:00 AM - 12:00 AM',
    similar: [1, 2]
  }
];

const HallBooking = () => {
  const [filteredHalls, setFilteredHalls] = useState(halls);
  const [selectedHall, setSelectedHall] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filters, setFilters] = useState({
    city: '',
    locality: '',
    capacity: '',
    budget: '',
    eventType: '',
    date: '',
    amenities: [],
    spaces: 'any', // 'indoor', 'outdoor', 'any'
  });
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    capacity: '',
    name: '',
    email: '',
    phone: '',
    eventType: '',
    package: '',
    menu: 'veg',
    menuPackage: '',
    specialRequests: '',
  });
  const [activePriceRange, setActivePriceRange] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [showSimilarVenues, setShowSimilarVenues] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [cities, setCities] = useState(citiesData);
  const [localities, setLocalities] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const modalRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    
    // Load any saved favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteVenues');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Load recently viewed venues from localStorage
    const recentVenues = localStorage.getItem('recentlyViewedVenues');
    if (recentVenues) {
      setRecentlyViewed(JSON.parse(recentVenues));
    }
    
    // Add click outside listener when modal is open
    if (selectedHall) {
      document.addEventListener('mousedown', handleClickOutside);
      // Add escape key listener
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };
      document.addEventListener('keydown', handleEscape);
      
      // Add to recently viewed
      addToRecentlyViewed(selectedHall.id);

      // Cleanup listeners
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [selectedHall]);
  
  // Update localities when city changes
  useEffect(() => {
    if (filters.city && localities[filters.city]) {
      setLocalities(localities[filters.city]);
    } else {
      setLocalities([]);
    }
  }, [filters.city]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };
  
  const closeModal = () => {
      setSelectedHall(null);
      setCurrentImageIndex(0);
      setSelectedPackage(null);
    setSelectedMenu(null);
    setActiveTab('overview');
    setBookingStep(1);
    setFormSubmitted(false);
  };
  
  const addToRecentlyViewed = (hallId) => {
    // Add to recently viewed and store in localStorage
    const updatedRecent = [hallId, ...recentlyViewed.filter(id => id !== hallId)].slice(0, 5);
    setRecentlyViewed(updatedRecent);
    localStorage.setItem('recentlyViewedVenues', JSON.stringify(updatedRecent));
  };
  
  const toggleFavorite = (hallId) => {
    const newFavorites = favorites.includes(hallId)
      ? favorites.filter(id => id !== hallId)
      : [...favorites, hallId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteVenues', JSON.stringify(newFavorites));
  };

  const handleSearch = (newFilters) => {
    setIsLoading(true);
    setFilters({ ...filters, ...newFilters });
    
    // Simulate API delay
    setTimeout(() => {
    const filtered = halls.filter(hall => {
        // City filter
      const matchCity = !newFilters.city || 
        hall.city.toLowerCase() === newFilters.city.toLowerCase();
        
        // Locality filter
        const matchLocality = !newFilters.locality || 
          hall.locality.toLowerCase() === newFilters.locality.toLowerCase();
        
        // Capacity filter
      const matchCapacity = !newFilters.capacity || 
        parseInt(hall.capacity) >= parseInt(newFilters.capacity);
        
        // Budget filter
      const matchBudget = !newFilters.budget || 
        hall.basePrice <= parseInt(newFilters.budget);
        
        // Event type filter
      const matchEventType = !newFilters.eventType || 
        hall.availableFor.includes(newFilters.eventType);
        
        // Date filter - check if the date is in availableDates
        const matchDate = !newFilters.date || 
          hall.availableDates.includes(newFilters.date);
        
        // Amenities filter
        const matchAmenities = newFilters.amenities?.length === 0 || 
          !newFilters.amenities || 
          newFilters.amenities.every(am => 
            hall.amenities.some(a => a.name === am && a.included)
          );
        
        // Space type filter
        let matchSpaces = true;
        if (newFilters.spaces === 'indoor') {
          matchSpaces = hall.spaces.some(s => s.isIndoor);
        } else if (newFilters.spaces === 'outdoor') {
          matchSpaces = hall.spaces.some(s => !s.isIndoor);
        }
        
        return matchCity && matchLocality && matchCapacity && matchBudget && 
          matchEventType && matchDate && matchAmenities && matchSpaces;
      });
      
    setFilteredHalls(filtered);
      setIsLoading(false);
    }, 500);
  };
  
  const handlePriceRangeFilter = (range) => {
    setActivePriceRange(range);
    let minPrice, maxPrice;
    
    switch(range) {
      case 'under-50000':
        maxPrice = 50000;
        break;
      case '50000-100000':
        minPrice = 50000;
        maxPrice = 100000;
        break;
      case '100000-200000':
        minPrice = 100000;
        maxPrice = 200000;
        break;
      case 'above-200000':
        minPrice = 200000;
        break;
      default:
        // Reset price filter
        setFilters({ ...filters, budget: '' });
        return;
    }
    
    const updatedFilters = { ...filters };
    if (minPrice) updatedFilters.minBudget = minPrice;
    if (maxPrice) updatedFilters.maxBudget = maxPrice;
    
    handleSearch(updatedFilters);
  };
  
  const sortHalls = (sortBy) => {
    let sorted = [...filteredHalls];
    
    switch(sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'capacity':
        sorted.sort((a, b) => parseInt(b.capacity) - parseInt(a.capacity));
        break;
      default:
        // No sorting or default sorting
        break;
    }
    
    setFilteredHalls(sorted);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
      return;
    }
    
    // Validate required fields before final submission
    if (!selectedPackage) {
      setError('Please select a package');
      return;
    }
    
    if (!selectedMenu && bookingForm.menu !== 'none') {
      setError('Please select a menu package');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Actual API call would be:
      // await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, {
      //   hallId: selectedHall.id,
      //   packageId: selectedPackage.name,
      //   menuPackage: selectedMenu?.name || 'None',
      //   ...bookingForm,
      // });
      
      setFormSubmitted(true);
      setIsLoading(false);
      setError('');
      
      // Reset form after 5 seconds and close modal
      setTimeout(() => {
      setBookingForm({
        date: '',
        time: '',
        capacity: '',
        name: '',
        email: '',
        phone: '',
        eventType: '',
        package: '',
          menu: 'veg',
          menuPackage: '',
        specialRequests: '',
      });
      setSelectedPackage(null);
        setSelectedMenu(null);
        setBookingStep(1);
        setFormSubmitted(false);
        setSelectedHall(null);
      }, 5000);
      
    } catch (err) {
      setError('Error submitting booking. Please try again.');
      setIsLoading(false);
    }
  };
  
  const getSimilarVenues = (hallId) => {
    const hall = halls.find(h => h.id === hallId);
    if (!hall || !hall.similar) return [];
    
    return halls.filter(h => hall.similar.includes(h.id));
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const nextImage = () => {
    if (selectedHall) {
      setCurrentImageIndex((prev) => 
        prev === selectedHall.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedHall) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedHall.images.length - 1 : prev - 1
      );
    }
  };
  
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const getFilteredRecentlyViewed = () => {
    return halls.filter(hall => recentlyViewed.includes(hall.id));
  };

  return (
    <div className="font-poppins bg-gray-50">
      {/* Hero section with search */}
      <section className="relative bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">Find Perfect Venues for Your Events</h1>
            <p className="text-xl opacity-90 mb-8" data-aos="fade-up" data-aos-delay="100">
              Book banquet halls, function venues, and party places across India
            </p>
            
            {/* Event types quick select */}
            <div className="flex flex-wrap justify-center gap-3 mb-8" data-aos="fade-up" data-aos-delay="200">
              {eventTypes.slice(0, 5).map((type) => (
                <button 
                  key={type.id}
                  onClick={() => handleSearch({ eventType: type.name })}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    filters.eventType === type.name 
                      ? 'bg-white text-teal-700 font-medium'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Search form */}
          <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="300" ref={searchRef}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">City</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaMapMarkerAlt />
                  </span>
              <select
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                value={filters.city}
                    onChange={(e) => handleSearch({ city: e.target.value, locality: '' })}
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Event Type</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaCalendarAlt />
                  </span>
                  <select 
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    value={filters.eventType}
                    onChange={(e) => handleSearch({ eventType: e.target.value })}
                  >
                    <option value="">All Event Types</option>
                    {eventTypes.map(type => (
                      <option key={type.id} value={type.name}>{type.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Guest Count</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaUsers />
                  </span>
                  <select 
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    value={filters.capacity}
                    onChange={(e) => handleSearch({ capacity: e.target.value })}
                  >
                    <option value="">Select Guest Count</option>
                    <option value="50">Upto 50 guests</option>
                    <option value="100">Upto 100 guests</option>
                    <option value="200">Upto 200 guests</option>
                    <option value="500">Upto 500 guests</option>
                    <option value="1000">Upto 1000 guests</option>
                    <option value="2000">1000+ guests</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Event Date</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaCalendarAlt />
                  </span>
              <input
                    type="date" 
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    value={filters.date}
                    onChange={(e) => handleSearch({ date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Locality</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaMapMarkerAlt />
                  </span>
              <select
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    value={filters.locality}
                    onChange={(e) => handleSearch({ locality: e.target.value })}
                    disabled={!filters.city || !localities.length}
                  >
                    <option value="">All Localities</option>
                    {localities.map(locality => (
                      <option key={locality} value={locality}>{locality}</option>
                    ))}
              </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Space Preference</label>
                <div className="relative">
                  <select 
                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    value={filters.spaces}
                    onChange={(e) => handleSearch({ spaces: e.target.value })}
                  >
                    <option value="any">Any Spaces</option>
                    <option value="indoor">Indoor Only</option>
                    <option value="outdoor">Outdoor Only</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button 
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium text-lg shadow-lg transition-colors flex items-center"
                onClick={() => {
                  // This would typically do a more comprehensive search
                  // Here we're just reusing what we already have
                  handleSearch(filters);
                  
                  // Scroll to results
                  window.scrollTo({
                    top: searchRef.current.offsetTop + searchRef.current.offsetHeight,
                    behavior: 'smooth'
                  });
                }}
              >
                <FaSearch className="mr-2" /> Find Venues
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results section with filters */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar - desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-5 sticky top-5">
              <h3 className="font-bold text-lg border-b pb-3 mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { id: 'any', label: 'Any Price' },
                    { id: 'under-50000', label: 'Under ₹50,000' },
                    { id: '50000-100000', label: '₹50,000 - ₹1,00,000' },
                    { id: '100000-200000', label: '₹1,00,000 - ₹2,00,000' },
                    { id: 'above-200000', label: 'Above ₹2,00,000' }
                  ].map(range => (
                    <div key={range.id} className="flex items-center">
              <input
                        type="radio" 
                        id={`price-${range.id}`} 
                        name="price-range" 
                        checked={activePriceRange === range.id}
                        onChange={() => handlePriceRangeFilter(range.id)}
                        className="mr-2 accent-teal-600"
                      />
                      <label htmlFor={`price-${range.id}`} className="text-gray-700 text-sm">
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Space Type */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Space Type</h4>
                <div className="space-y-2">
                  {[
                    { id: 'any', label: 'Any Space' },
                    { id: 'indoor', label: 'Indoor Only' },
                    { id: 'outdoor', label: 'Outdoor Only' },
                  ].map(space => (
                    <div key={space.id} className="flex items-center">
              <input
                        type="radio" 
                        id={`space-${space.id}`} 
                        name="space-type" 
                        checked={filters.spaces === space.id}
                        onChange={() => handleSearch({ spaces: space.id })}
                        className="mr-2 accent-teal-600"
                      />
                      <label htmlFor={`space-${space.id}`} className="text-gray-700 text-sm">
                        {space.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Amenities */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Amenities</h4>
                <div className="space-y-2">
                  {['Air Conditioning', 'Parking', 'Catering', 'DJ', 'Wi-Fi', 'Decoration', 'Valet'].map(amenity => (
                    <div key={amenity} className="flex items-center">
              <input
                        type="checkbox" 
                        id={`amenity-${amenity}`} 
                        checked={filters.amenities?.includes(amenity)}
                        onChange={() => {
                          const currentAmenities = filters.amenities || [];
                          const newAmenities = currentAmenities.includes(amenity)
                            ? currentAmenities.filter(a => a !== amenity)
                            : [...currentAmenities, amenity];
                          
                          handleSearch({ amenities: newAmenities });
                        }}
                        className="mr-2 accent-teal-600"
                      />
                      <label htmlFor={`amenity-${amenity}`} className="text-gray-700 text-sm">
                        {amenity}
                      </label>
            </div>
                  ))}
          </div>
        </div>
              
              {/* Reset Filters */}
              <button 
                className="w-full py-2 text-sm text-teal-600 border border-teal-600 rounded-md hover:bg-teal-50 transition-colors"
                onClick={() => {
                  setFilters({
                    city: '',
                    locality: '',
                    capacity: '',
                    budget: '',
                    eventType: '',
                    date: '',
                    amenities: [],
                    spaces: 'any',
                  });
                  setActivePriceRange('');
                  handleSearch({});
                }}
              >
                Reset All Filters
              </button>
            </div>
          </div>
          
          {/* Mobile filters button */}
          <div className="lg:hidden mb-4">
            <button 
              className="w-full bg-white p-3 rounded-md shadow-md flex items-center justify-center text-gray-700"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <FaFilter className="mr-2" /> 
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {/* Mobile filters panel */}
            {showMobileFilters && (
              <div className="bg-white rounded-lg shadow-md p-5 mt-2">
                {/* Mobile filters content - same as desktop but condensed */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Price Range */}
                  <div className="col-span-2">
                    <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={activePriceRange}
                      onChange={(e) => handlePriceRangeFilter(e.target.value)}
                    >
                      <option value="">Any Price</option>
                      <option value="under-50000">Under ₹50,000</option>
                      <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                      <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                      <option value="above-200000">Above ₹2,00,000</option>
                    </select>
                  </div>
                  
                  {/* Space Type */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Space Type</h4>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={filters.spaces}
                      onChange={(e) => handleSearch({ spaces: e.target.value })}
                    >
                      <option value="any">Any Space</option>
                      <option value="indoor">Indoor Only</option>
                      <option value="outdoor">Outdoor Only</option>
                    </select>
                  </div>
                  
                  {/* Quick Amenities */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Must Have</h4>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      onChange={(e) => {
                        if (e.target.value) {
                          handleSearch({ amenities: [e.target.value] });
                        }
                      }}
                    >
                      <option value="">Select Amenity</option>
                      <option value="Air Conditioning">Air Conditioning</option>
                      <option value="Parking">Parking</option>
                      <option value="Wi-Fi">Wi-Fi</option>
                      <option value="Catering">Catering</option>
                    </select>
                  </div>
                  
                  {/* Reset button */}
                  <div className="col-span-2 mt-2">
                    <button 
                      className="w-full py-2 text-sm text-teal-600 border border-teal-600 rounded-md"
                      onClick={() => {
                        setFilters({
                          city: '',
                          locality: '',
                          capacity: '',
                          budget: '',
                          eventType: '',
                          date: '',
                          amenities: [],
                          spaces: 'any',
                        });
                        setActivePriceRange('');
                        handleSearch({});
                        setShowMobileFilters(false);
                      }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Results column */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredHalls.length} {filters.city ? `Venues in ${filters.city}` : 'Venues Found'}
              </h2>
              
              <div className="flex items-center mt-2 sm:mt-0">
                <label className="mr-2 text-gray-700">Sort by:</label>
                <select 
                  className="p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  onChange={(e) => sortHalls(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="capacity">Capacity</option>
                </select>
              </div>
            </div>
            
            {/* Recently viewed */}
            {getFilteredRecentlyViewed().length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Recently Viewed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFilteredRecentlyViewed().slice(0, 3).map(hall => (
                    <div 
                      key={`recent-${hall.id}`} 
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedHall(hall)}
                    >
                      <div className="relative h-40">
                        <img 
                          src={hall.image} 
                          alt={hall.name} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <h4 className="absolute bottom-3 left-3 text-white font-bold">{hall.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Loading state */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700"></div>
              </div>
            )}
            
            {/* No results */}
            {!isLoading && filteredHalls.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-5xl mb-4">😕</div>
                <h3 className="text-xl font-bold mb-2">No Venues Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or searching for venues in a different city.</p>
                <button 
                  className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  onClick={() => {
                    setFilters({
                      city: '',
                      locality: '',
                      capacity: '',
                      budget: '',
                      eventType: '',
                      date: '',
                      amenities: [],
                      spaces: 'any',
                    });
                    setActivePriceRange('');
                    handleSearch({});
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
            
            {/* Results grid */}
            {!isLoading && filteredHalls.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHalls.map(hall => (
                  <div 
                    key={hall.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow"
                    data-aos="fade-up"
                  >
                    {/* Venue image with discount badge */}
                    <div className="relative">
              <img
                src={hall.image}
                alt={hall.name}
                className="w-full h-48 object-cover"
              />
                      
                      {/* Favorite button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(hall.id);
                        }}
                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md z-10"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 ${favorites.includes(hall.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
                          viewBox="0 0 20 20" 
                          fill={favorites.includes(hall.id) ? "currentColor" : "none"} 
                          stroke="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </button>
                      
                      {/* Promoted tag */}
                      {hall.isPromoted && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                          Promoted
                        </div>
                      )}
                      
                      {/* Discount badge */}
                      {hall.discount > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-2">
                          <div className="flex items-center text-sm font-medium">
                            <FaPercent className="mr-1 text-yellow-400" />
                            <span>{hall.discount}% OFF on booking today</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Venue details */}
              <div className="p-4">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg mb-1 text-gray-800">{hall.name}</h3>
                        <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded text-sm">
                          <FaStar className="text-yellow-500 mr-1" /> {hall.rating}
                </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">{hall.location}</p>
                      
                      <div className="flex items-center mb-3 text-sm text-gray-500">
                        <FaUsers className="mr-1" />
                        <span>Upto {hall.capacity} guests</span>
                      </div>
                      
                <div className="flex flex-wrap gap-2 mb-3">
                  {hall.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                            {amenity.icon} {amenity.name}
                    </span>
                  ))}
                  {hall.amenities.length > 3 && (
                    <span className="text-gray-500 text-xs">+{hall.amenities.length - 3} more</span>
                  )}
                </div>
                      
                      <div className="flex justify-between items-center border-t pt-3">
                        <div>
                          <p className="text-gray-500 text-xs">Starting from</p>
                          <p className="text-teal-700 font-bold text-lg">₹{formatPrice(hall.basePrice)}</p>
                        </div>
                        
                <button
                  onClick={() => setSelectedHall(hall)}
                          className="bg-teal-600 text-white px-3 py-1.5 rounded hover:bg-teal-700 transition-colors"
                >
                  View Details
                </button>
                      </div>
              </div>
            </div>
          ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Venue Detail Modal */}
      {selectedHall && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 overflow-y-auto p-4">
          <div 
            ref={modalRef} 
            className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
            data-aos="fade-up"
          >
            {/* Close button */}
              <button
              onClick={closeModal}
              className="absolute right-4 top-4 bg-white rounded-full p-2 shadow-lg z-20 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              </button>
            
            {/* Booking success message */}
            {formSubmitted && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 z-30">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheck className="text-3xl text-green-600" />
            </div>
                  <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                  <p className="text-gray-600 mb-6">Your venue has been successfully booked. A confirmation email has been sent to your inbox.</p>
                  <button 
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg"
                    onClick={closeModal}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
            
            {/* Image gallery */}
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className="h-96"
              >
                {selectedHall.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={`${selectedHall.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Favorite button */}
              <button
                className="absolute right-4 top-4 z-10 bg-white p-2 rounded-full shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(selectedHall.id);
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 ${favorites.includes(selectedHall.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
                  viewBox="0 0 20 20" 
                  fill={favorites.includes(selectedHall.id) ? "currentColor" : "none"} 
                  stroke="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
              
              {/* Venue name overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedHall.name}</h2>
                    <p className="text-white/90 flex items-center">
                      <FaMapMarkerAlt className="mr-2" /> {selectedHall.location}
                    </p>
                  </div>
                  <div className="flex items-center bg-white px-3 py-1 rounded text-gray-800">
                    <FaStar className="text-yellow-500 mr-1" /> 
                    <span className="font-bold">{selectedHall.rating}</span>
                    <span className="text-gray-600 text-sm ml-1">({selectedHall.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Tabs */}
              <div className="mb-6 border-b">
                <div className="flex overflow-x-auto">
                  {['overview', 'amenities', 'packages', 'policies'].map(tab => (
              <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`px-4 py-2 font-medium whitespace-nowrap ${
                        activeTab === tab
                          ? 'text-teal-600 border-b-2 border-teal-600'
                          : 'text-gray-600 hover:text-teal-600'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
                  ))}
                </div>
            </div>

              {/* Tab content */}
              <div>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3">About {selectedHall.name}</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">{selectedHall.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-gray-500 text-sm">Capacity</div>
                            <div className="font-semibold">{selectedHall.capacity} Guests</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-gray-500 text-sm">Price</div>
                            <div className="font-semibold">₹{formatPrice(selectedHall.basePrice)}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-gray-500 text-sm">Starts from</div>
                            <div className="font-semibold">₹{selectedHall.minPrice}/plate</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-gray-500 text-sm">Spaces</div>
                            <div className="font-semibold">{selectedHall.totalSpaces}</div>
                          </div>
                </div>

                        <h4 className="font-semibold mb-2">Available Spaces</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left">Space Name</th>
                                <th className="px-4 py-2 text-center">Type</th>
                                <th className="px-4 py-2 text-center">Capacity</th>
                                <th className="px-4 py-2 text-right">Size</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {selectedHall.spaces.map((space, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-4 py-3">{space.name}</td>
                                  <td className="px-4 py-3 text-center">{space.isIndoor ? 'Indoor' : 'Outdoor'}</td>
                                  <td className="px-4 py-3 text-center">{space.capacity} guests</td>
                                  <td className="px-4 py-3 text-right">{space.size}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
              </div>

                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3">Food & Beverage</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <span className="mr-2">🌱</span> Vegetarian Options
                            </h4>
                            <div className="space-y-3">
                              {selectedHall.veg_menu.map((menu, index) => (
                                <div key={index} className="flex justify-between">
              <div>
                                    <div className="font-medium">{menu.name}</div>
                                    <div className="text-sm text-gray-500">{menu.items} items</div>
                      </div>
                                  <div className="text-teal-700 font-semibold">₹{menu.price}/plate</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <span className="mr-2">🍗</span> Non-Vegetarian Options
                            </h4>
                            <div className="space-y-3">
                              {selectedHall.nonveg_menu.map((menu, index) => (
                                <div key={index} className="flex justify-between">
                                  <div>
                                    <div className="font-medium">{menu.name}</div>
                                    <div className="text-sm text-gray-500">{menu.items} items</div>
                                  </div>
                                  <div className="text-teal-700 font-semibold">₹{menu.price}/plate</div>
                    </div>
                  ))}
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
                {/* Booking Form */}
                <div>
                  {bookingStep === 1 && (
                    <div className="bg-white border rounded-lg p-5 sticky top-5">
                      <h3 className="text-xl font-bold mb-3">Book This Venue</h3>
                      
                      {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">
                          {error}
                        </div>
                      )}
                      
                      <form onSubmit={handleBookingSubmit}>
                        <div className="mb-4">
                          <label className="block text-gray-700 mb-2">Event Date</label>
                      <input
                        type="date"
                                className="w-full p-2 border rounded focus:ring-teal-500 focus:border-teal-500"
                                min={new Date().toISOString().split('T')[0]}
                        value={bookingForm.date}
                                onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                        required
                      />
                    </div>
                            
                            <div className="mb-4">
                              <label className="block text-gray-700 mb-2">Event Type</label>
                    <select
                                className="w-full p-2 border rounded focus:ring-teal-500 focus:border-teal-500"
                      value={bookingForm.eventType}
                                onChange={(e) => setBookingForm({...bookingForm, eventType: e.target.value})}
                      required
                    >
                      <option value="">Select Event Type</option>
                      {selectedHall.availableFor.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                            
                            <div className="mb-4">
                              <label className="block text-gray-700 mb-2">Guest Count</label>
                              <select
                                className="w-full p-2 border rounded focus:ring-teal-500 focus:border-teal-500"
                      value={bookingForm.capacity}
                                onChange={(e) => setBookingForm({...bookingForm, capacity: e.target.value})}
                      required
                              >
                                <option value="">Select Guest Count</option>
                                <option value="50-100">50-100 guests</option>
                                <option value="100-200">100-200 guests</option>
                                <option value="200-300">200-300 guests</option>
                                <option value="300-500">300-500 guests</option>
                                <option value="500+">500+ guests</option>
                              </select>
                            </div>
                            
                            <div className="mt-6">
                              <button
                                type="submit"
                                className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                              >
                                Continue <FaArrowRight className="ml-2 inline" />
                              </button>
                            </div>
                            
                            <div className="mt-4 text-center text-sm text-gray-500">
                              <p>No payment required to book</p>
                            </div>
                          </form>
                        </div>
                      )}
                      
                      {bookingStep === 2 && (
                        <div className="bg-white border rounded-lg p-5 sticky top-5">
                          <h3 className="text-xl font-bold mb-3">Select Package</h3>
                          
                          {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">
                              {error}
                            </div>
                          )}
                          
                          <form onSubmit={handleBookingSubmit}>
                            <div className="mb-6">
                              <div className="space-y-4">
                                {selectedHall.packages.map((pkg) => (
                                  <div
                                    key={pkg.name}
                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                      selectedPackage?.name === pkg.name 
                                        ? 'border-teal-500 bg-teal-50' 
                                        : 'hover:border-gray-400'
                                    }`}
                                    onClick={() => setSelectedPackage(pkg)}
                                  >
                                    <div className="flex justify-between items-center mb-2">
                                      <h5 className="font-bold">{pkg.name} Package</h5>
                                      <span className="text-teal-700 font-bold">₹{formatPrice(pkg.price)}</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                      <div>
                                        <p className="text-gray-700 font-medium mb-1">Includes:</p>
                                        <ul className="space-y-1">
                                          {pkg.includes.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                              <FaCheck className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                                              <span className="text-gray-600">{item}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      {pkg.excludes.length > 0 && (
                                        <div>
                                          <p className="text-gray-700 font-medium mb-1">Not Included:</p>
                                          <ul className="space-y-1 text-gray-600">
                                            {pkg.excludes.map((item, index) => (
                                              <li key={index}>• {item}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <label className="block text-gray-700 mb-2">Select Menu Type</label>
                              <div className="flex gap-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="menu"
                                    value="veg"
                                    checked={bookingForm.menu === 'veg'}
                                    onChange={() => setBookingForm({...bookingForm, menu: 'veg'})}
                                    className="mr-2 accent-teal-600"
                                  />
                                  Vegetarian
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="menu"
                                    value="nonveg"
                                    checked={bookingForm.menu === 'nonveg'}
                                    onChange={() => setBookingForm({...bookingForm, menu: 'nonveg'})}
                                    className="mr-2 accent-teal-600"
                                  />
                                  Non-Vegetarian
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="menu"
                                    value="none"
                                    checked={bookingForm.menu === 'none'}
                                    onChange={() => setBookingForm({...bookingForm, menu: 'none'})}
                                    className="mr-2 accent-teal-600"
                                  />
                                  No Food
                                </label>
                  </div>
                            </div>
                            
                            {bookingForm.menu !== 'none' && (
                              <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Select Menu Package</label>
                                <div className="space-y-3">
                                  {(bookingForm.menu === 'veg' ? selectedHall.veg_menu : selectedHall.nonveg_menu).map((menu) => (
                                    <div
                                      key={menu.name}
                                      className={`p-3 border rounded-lg cursor-pointer flex justify-between ${
                                        selectedMenu?.name === menu.name 
                                          ? 'border-teal-500 bg-teal-50' 
                                          : 'hover:border-gray-400'
                                      }`}
                                      onClick={() => setSelectedMenu(menu)}
                                    >
                    <div>
                                        <div className="font-medium">{menu.name}</div>
                                        <div className="text-sm text-gray-500">{menu.items} items</div>
                                      </div>
                                      <div className="text-teal-700 font-bold">₹{menu.price}/plate</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="mt-6">
                              <button
                                type="submit"
                                className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                              >
                                Continue <FaArrowRight className="ml-2 inline" />
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                      
                      {bookingStep === 3 && (
                        <div className="bg-white border rounded-lg p-5 sticky top-5">
                          <h3 className="text-xl font-bold mb-3">Contact Information</h3>
                          
                          {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">
                              {error}
                            </div>
                          )}
                          
                          <form onSubmit={handleBookingSubmit}>
                            <div className="mb-4">
                              <label className="block text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                                className="w-full p-2 border rounded focus:ring-teal-500 focus:border-teal-500"
                        value={bookingForm.name}
                                onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        required
                      />
                    </div>
                            
                            <div className="mb-4">
                              <label className="block text-gray-700 mb-2">Email Address</label>
                      <input
                                type="email"
                                className="w-full p-2 border rounded focus:ring-teal-500 focus:border-teal-500"
                                value={bookingForm.email}
                                onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                        required
                      />
                    </div>
                            
                            <div className="mb-4">
                              <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                                type="tel"
                                className="w-full p-2 border rounded focus:ring-teal-500 focus:border-teal-500"
                                value={bookingForm.phone}
                                onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      required
                    />
                  </div>
                            
                            <div className="mb-6">
                              <label className="block text-gray-700 mb-2">Special Requests (Optional)</label>
                    <textarea
                      rows="3"
                                className="w-full p-2 border rounded focus:ring-teal-500 focus:border-teal-500"
                                value={bookingForm.specialRequests}
                                onChange={(e) => setBookingForm({...bookingForm, specialRequests: e.target.value})}
                    ></textarea>
                  </div>
                            
                            <div className="border-t pt-4 mb-6">
                              <h4 className="font-semibold mb-2">Booking Summary</h4>
                              <table className="w-full text-sm">
                                <tbody>
                                  <tr>
                                    <td className="py-1 text-gray-600">Venue:</td>
                                    <td className="py-1 text-right font-medium">{selectedHall.name}</td>
                                  </tr>
                                  <tr>
                                    <td className="py-1 text-gray-600">Date:</td>
                                    <td className="py-1 text-right font-medium">{bookingForm.date}</td>
                                  </tr>
                                  <tr>
                                    <td className="py-1 text-gray-600">Event Type:</td>
                                    <td className="py-1 text-right font-medium">{bookingForm.eventType}</td>
                                  </tr>
                                  <tr>
                                    <td className="py-1 text-gray-600">Guest Count:</td>
                                    <td className="py-1 text-right font-medium">{bookingForm.capacity}</td>
                                  </tr>
                                  <tr>
                                    <td className="py-1 text-gray-600">Package:</td>
                                    <td className="py-1 text-right font-medium">{selectedPackage?.name}</td>
                                  </tr>
                                  {selectedMenu && (
                                    <tr>
                                      <td className="py-1 text-gray-600">Menu:</td>
                                      <td className="py-1 text-right font-medium">{selectedMenu.name}</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                            
                            {isLoading ? (
                              <div className="flex justify-center py-3">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-700"></div>
                              </div>
                            ) : (
                  <button
                    type="submit"
                                className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                  >
                                Confirm Booking
                  </button>
                            )}
                            
                            <div className="mt-4 text-center text-sm text-gray-500">
                              <p>A venue representative will contact you shortly</p>
                            </div>
                </form>
              </div>
                      )}
            </div>
          </div>
                )}
                
                {/* Amenities Tab */}
                {activeTab === 'amenities' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedHall.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-start border p-4 rounded-lg">
                        <div className="w-10 h-10 flex-shrink-0 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mr-3">
                          {amenity.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{amenity.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {amenity.included ? 'Included in package' : 'Available at extra cost'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Packages Tab */}
                {activeTab === 'packages' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {selectedHall.packages.map((pkg) => (
                        <div key={pkg.name} className="border rounded-lg overflow-hidden">
                          <div className="bg-teal-600 text-white py-3 px-4">
                            <h3 className="font-bold text-lg">{pkg.name} Package</h3>
                            <p className="text-2xl font-bold">₹{formatPrice(pkg.price)}</p>
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-3">Includes:</h4>
                            <ul className="space-y-2 mb-6">
                              {pkg.includes.map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <FaCheck className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                                  <span className="text-gray-600">{item}</span>
                                </li>
                              ))}
                            </ul>
                            
                            {pkg.excludes.length > 0 && (
                              <>
                                <h4 className="font-medium mb-3">Not Included:</h4>
                                <ul className="space-y-2 text-gray-600">
                                  {pkg.excludes.map((item, index) => (
                                    <li key={index}>• {item}</li>
                                  ))}
                                </ul>
                              </>
                            )}
                            
                            <button 
                              className="w-full mt-6 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition-colors"
                              onClick={() => {
                                setSelectedPackage(pkg);
                                setActiveTab('overview');
                                setBookingStep(Math.max(bookingStep, 2));
                              }}
                            >
                              Select Package
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold text-lg mb-4">Food Packages</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Vegetarian</h4>
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Package</th>
                                <th className="text-center py-2">Items</th>
                                <th className="text-right py-2">Price/Plate</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedHall.veg_menu.map((menu, index) => (
                                <tr key={index} className="border-b">
                                  <td className="py-3">{menu.name}</td>
                                  <td className="text-center">{menu.items}</td>
                                  <td className="text-right font-medium">₹{menu.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Non-Vegetarian</h4>
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Package</th>
                                <th className="text-center py-2">Items</th>
                                <th className="text-right py-2">Price/Plate</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedHall.nonveg_menu.map((menu, index) => (
                                <tr key={index} className="border-b">
                                  <td className="py-3">{menu.name}</td>
                                  <td className="text-center">{menu.items}</td>
                                  <td className="text-right font-medium">₹{menu.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Policies Tab */}
                {activeTab === 'policies' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Venue Policies</h3>
                      <ul className="space-y-3">
                        {selectedHall.policies.map((policy, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-teal-600 mr-2">•</span>
                            <span className="text-gray-700">{policy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                      <div className="space-y-4">
                        {selectedHall.faq.map((item, index) => (
                          <div key={index}>
                            <h4 className="font-medium text-gray-900 mb-1">{item.question}</h4>
                            <p className="text-gray-600">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Similar venues section */}
            <div className="bg-gray-50 px-6 py-8 border-t">
              <h3 className="text-xl font-bold mb-6">Similar Venues You May Like</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getSimilarVenues(selectedHall.id).map(hall => (
                  <div 
                    key={hall.id} 
                    className="bg-white rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      setSelectedHall(hall);
                      setCurrentImageIndex(0);
                      setActiveTab('overview');
                      setBookingStep(1);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="relative">
                      <img 
                        src={hall.image} 
                        alt={hall.name} 
                        className="w-full h-48 object-cover rounded-t-lg" 
                      />
                      {hall.discount > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          {hall.discount}% OFF
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold">{hall.name}</h4>
                      <p className="text-sm text-gray-600">{hall.location}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span>{hall.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HallBooking;