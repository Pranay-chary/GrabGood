import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShoppingCart, FaStar, FaHeart, FaRegHeart, FaFilter, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Sample sweet shop product data
const sweetsData = [
  {
    id: 1,
    name: 'Kaju Katli',
    description: 'A classic Indian sweet made with cashews and sugar, with a delicate silver foil garnish.',
    price: 800,
    discountedPrice: 720,
    discount: 10,
    rating: 4.8,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1601303516532-3afcf6d2b5e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FqdSUyMGthdGxpfGVufDB8fDB8fHww',
    category: 'premium',
    tags: ['cashew', 'traditional', 'bestseller'],
    isVegetarian: true,
    weight: '500g',
    availability: 'In Stock',
    featuredProduct: true
  },
  {
    id: 2,
    name: 'Gulab Jamun',
    description: 'Soft, spongy milk-solid balls soaked in rose-flavored sugar syrup.',
    price: 550,
    discountedPrice: 495,
    discount: 10,
    rating: 4.7,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1593276461508-a252bc486f9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VsYWIlMjBqYW11bnxlbnwwfHwwfHx8MA%3D%3D',
    category: 'traditional',
    tags: ['milk', 'syrup', 'popular'],
    isVegetarian: true,
    weight: '500g',
    availability: 'In Stock',
    featuredProduct: true
  },
  {
    id: 3,
    name: 'Soan Papdi',
    description: 'A flaky, crisp Indian sweet with a melt-in-mouth texture flavored with cardamom.',
    price: 400,
    discountedPrice: 400,
    discount: 0,
    rating: 4.5,
    reviews: 75,
    image: 'https://plus.unsplash.com/premium_photo-1661767552576-dea5aacdee35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29hbiUyMHBhcGRpfGVufDB8fDB8fHww',
    category: 'traditional',
    tags: ['flaky', 'cardamom', 'gift'],
    isVegetarian: true,
    weight: '500g',
    availability: 'In Stock',
    featuredProduct: false
  },
  {
    id: 4,
    name: 'Rasgulla',
    description: 'Soft, spongy cheese balls soaked in a light sugary syrup.',
    price: 600,
    discountedPrice: 570,
    discount: 5,
    rating: 4.6,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1601303516532-3afcf6d2b5e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFzZ3VsbGF8ZW58MHx8MHx8fDA%3D',
    category: 'traditional',
    tags: ['bengali', 'syrup', 'cheese'],
    isVegetarian: true,
    weight: '500g',
    availability: 'In Stock',
    featuredProduct: true
  },
  {
    id: 5,
    name: 'Mysore Pak',
    description: 'A rich sweet dish made from gram flour, ghee and sugar.',
    price: 650,
    discountedPrice: 650,
    discount: 0,
    rating: 4.7,
    reviews: 62,
    image: 'https://images.unsplash.com/photo-1601303516532-3afcf6d2b5e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXlzb3JlJTIwcGFrfGVufDB8fDB8fHww',
    category: 'premium',
    tags: ['south-indian', 'ghee', 'gram-flour'],
    isVegetarian: true,
    weight: '500g',
    availability: 'In Stock',
    featuredProduct: false
  },
  {
    id: 6,
    name: 'Jalebi',
    description: 'Pretzel-shaped deep-fried flour batter soaked in sugar syrup.',
    price: 350,
    discountedPrice: 315,
    discount: 10,
    rating: 4.4,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1589251204996-3367cc27f084?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFsZWJpfGVufDB8fDB8fHww',
    category: 'traditional',
    tags: ['crispy', 'syrup', 'popular'],
    isVegetarian: true,
    weight: '500g',
    availability: 'In Stock',
    featuredProduct: false
  },
  {
    id: 7,
    name: 'Badam Barfi',
    description: 'A rich almond fudge made with almonds, sugar, and ghee.',
    price: 900,
    discountedPrice: 810,
    discount: 10,
    rating: 4.9,
    reviews: 110,
    image: 'https://images.unsplash.com/photo-1601303516532-3afcf6d2b5e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFkYW0lMjBiYXJmaXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'premium',
    tags: ['almond', 'barfi', 'nuts'],
    isVegetarian: true,
    weight: '500g',
    availability: 'In Stock',
    featuredProduct: true
  },
  {
    id: 8,
    name: 'Motichoor Ladoo',
    description: 'Small, round sweets made from fine, fried gram flour balls soaked in sugar syrup.',
    price: 700,
    discountedPrice: 630,
    discount: 10,
    rating: 4.7,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1601303516532-3afcf6d2b5e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW90aWNob29yJTIwbGFkb298ZW58MHx8MHx8fDA%3D',
    category: 'traditional',
    tags: ['ladoo', 'festive', 'orange'],
    isVegetarian: true,
    weight: '500g',
    availability: 'In Stock',
    featuredProduct: true
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Sweets' },
  { id: 'premium', name: 'Premium Sweets' },
  { id: 'traditional', name: 'Traditional Sweets' },
  { id: 'gift-packs', name: 'Gift Packs' }
];

// SweetShop component definition
const SweetShopBooking = () => {
  const [sweets, setSweets] = useState(sweetsData);
  const [filteredSweets, setFilteredSweets] = useState(sweetsData);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('featured');
  const cartRef = useRef(null);
  
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('sweetshop_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('sweetshop_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sweetshop_cart', JSON.stringify(cart));
  }, [cart]);
  
  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('sweetshop_favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  // Filter sweets based on category, search query, and price range
  useEffect(() => {
    let filtered = sweetsData;
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(sweet => sweet.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(sweet => 
        sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(sweet => {
      const price = sweet.discountedPrice || sweet.price;
      return price >= priceRange.min && price <= priceRange.max;
    });
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featuredProduct ? 1 : 0) - (a.featuredProduct ? 1 : 0));
        break;
      default:
        break;
    }
    
    setFilteredSweets(filtered);
  }, [selectedCategory, searchQuery, priceRange, sortBy]);
  
  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Add item to cart
  const addToCart = (sweet) => {
    const existingItem = cart.find(item => item.id === sweet.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === sweet.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...sweet, quantity: 1 }]);
    }
  };
  
  // Remove item from cart
  const removeFromCart = (sweetId) => {
    setCart(cart.filter(item => item.id !== sweetId));
  };
  
  // Update item quantity in cart
  const updateQuantity = (sweetId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(sweetId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === sweetId ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // Toggle favorite status
  const toggleFavorite = (sweetId) => {
    if (favorites.includes(sweetId)) {
      setFavorites(favorites.filter(id => id !== sweetId));
    } else {
      setFavorites([...favorites, sweetId]);
    }
  };
  
  // Calculate cart total
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.discountedPrice || item.price) * item.quantity;
    }, 0);
  };
  
  // Handle checkout
  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
    // In a real app, this would navigate to a checkout page
  };
  
  return (
    <div className="bg-orange-50 min-h-screen">
      {/* Header/Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Delicious Indian Sweets</h1>
            <p className="text-xl mb-8">Handcrafted with love, tradition, and the finest ingredients</p>
          </div>
          
          {/* Search Box */}
          <div className="max-w-md mx-auto relative" data-aos="fade-up" data-aos-delay="100">
            <input
              type="text"
              placeholder="Search for sweets..."
              className="w-full p-3 pl-10 rounded-full shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-5">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <button
                  className="w-full p-3 bg-white rounded-lg shadow flex items-center justify-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FaFilter className="mr-2" /> 
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
              
              {/* Filters - Desktop always visible, mobile toggle */}
              <div className={`bg-white rounded-lg shadow-md p-5 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <h3 className="font-bold text-lg border-b pb-3 mb-4">Filters</h3>
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center">
                        <input 
                          type="radio" 
                          id={`category-${category.id}`} 
                          name="category"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                          className="mr-2 accent-orange-500"
                        />
                        <label htmlFor={`category-${category.id}`} className="text-gray-700">
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="w-full accent-orange-500"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>{formatPrice(0)}</span>
                      <span>{formatPrice(priceRange.max)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Sort By */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Sort By</h4>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
                
                {/* Reset Filters Button */}
                <button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition-colors"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setPriceRange({ min: 0, max: 1000 });
                    setSortBy('featured');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {filteredSweets.length} {filteredSweets.length === 1 ? 'Product' : 'Products'}
              </h2>
              
              {/* Cart Button */}
              <button 
                className="relative p-2 text-orange-500 hover:text-orange-600 transition-colors"
                onClick={() => setShowCart(!showCart)}
              >
                <FaShoppingCart className="text-2xl" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
            
            {/* No Results */}
            {filteredSweets.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No sweets found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
                <button 
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setPriceRange({ min: 0, max: 1000 });
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSweets.map(sweet => (
                <div 
                  key={sweet.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  data-aos="fade-up"
                >
                  {/* Product Image */}
                  <div className="relative h-48">
                    <img 
                      src={sweet.image} 
                      alt={sweet.name} 
                      className="w-full h-full object-cover"
                    />
                    {/* Discount Badge */}
                    {sweet.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {sweet.discount}% OFF
                      </div>
                    )}
                    {/* Favorite Button */}
                    <button 
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
                      onClick={() => toggleFavorite(sweet.id)}
                    >
                      {favorites.includes(sweet.id) ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{sweet.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i} 
                                className={i < Math.floor(sweet.rating) ? "text-yellow-400" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-1">({sweet.reviews})</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {sweet.discount > 0 && (
                          <span className="line-through text-gray-500 text-sm">
                            {formatPrice(sweet.price)}
                          </span>
                        )}
                        <div className="font-bold text-lg text-orange-600">
                          {formatPrice(sweet.discountedPrice || sweet.price)}
                        </div>
                        <div className="text-xs text-gray-500">{sweet.weight}</div>
                      </div>
                    </div>
                    
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">{sweet.description}</p>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {sweet.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors"
                        onClick={() => addToCart(sweet)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Background overlay */}
            <div 
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true"
              onClick={() => setShowCart(false)}
            ></div>
            
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <div className="relative w-screen max-w-md" ref={cartRef}>
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                  {/* Cart Header */}
                  <div className="px-4 py-6 bg-orange-500 text-white sm:px-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium" id="slide-over-title">
                        Shopping Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)
                      </h2>
                      <button
                        type="button"
                        className="text-white hover:text-gray-200"
                        onClick={() => setShowCart(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Cart Items */}
                  <div className="flex-1 px-4 py-6 sm:px-6">
                    {cart.length === 0 ? (
                      <div className="text-center py-10">
                        <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
                        <p className="mt-1 text-gray-500">Add some delicious sweets to your cart!</p>
                        <div className="mt-6">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
                            onClick={() => setShowCart(false)}
                          >
                            Continue Shopping
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {cart.map(item => (
                          <div key={item.id} className="flex items-center py-4 border-b">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            
                            <div className="ml-4 flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                <p className="text-orange-600 font-medium">
                                  {formatPrice((item.discountedPrice || item.price) * item.quantity)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{item.weight}</p>
                              
                              <div className="flex items-center mt-2">
                                <div className="flex items-center border rounded">
                                  <button
                                    className="px-2 py-1 text-gray-600"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <FaMinus size={12} />
                                  </button>
                                  <span className="px-2 py-1">{item.quantity}</span>
                                  <button
                                    className="px-2 py-1 text-gray-600"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <FaPlus size={12} />
                                  </button>
                                </div>
                                <button
                                  className="ml-4 text-red-500"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Cart Footer */}
                  {cart.length > 0 && (
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{formatPrice(calculateTotal())}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button
                          className="w-full bg-orange-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-white hover:bg-orange-600"
                          onClick={handleCheckout}
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="text-orange-600 font-medium hover:text-orange-500"
                            onClick={() => setShowCart(false)}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SweetShopBooking;
