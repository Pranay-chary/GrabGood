import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaHotel, FaUtensils, FaBirthdayCake, FaGlassCheers } from 'react-icons/fa';

const FeaturedVenues = () => {
  const venues = [
    {
      id: 1,
      category: 'Function Halls',
      icon: FaGlassCheers,
      items: [
        {
          name: 'Grand Celebration Hall',
          image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
          rating: 4.9,
          location: 'Mumbai Central',
          capacity: '1000+ guests'
        },
        {
          name: 'Royal Wedding Palace',
          image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1746&q=80',
          rating: 4.8,
          location: 'Delhi Heights',
          capacity: '800 guests'
        }
      ]
    },
    {
      id: 2,
      category: 'Hotels',
      icon: FaHotel,
      items: [
        {
          name: 'Luxury Inn',
          image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
          rating: 4.7,
          location: 'Bangalore City',
          features: 'Fine Dining, Pool'
        },
        {
          name: 'The Grand Hotel',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
          rating: 4.8,
          location: 'Chennai Beach',
          features: 'Spa, Restaurant'
        }
      ]
    },
    {
      id: 3,
      category: 'Restaurants',
      icon: FaUtensils,
      items: [
        {
          name: 'Spice Garden',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
          rating: 4.6,
          cuisine: 'Indian, Chinese',
          speciality: 'Buffet'
        },
        {
          name: 'Ocean Breeze',
          image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
          rating: 4.5,
          cuisine: 'Seafood',
          speciality: 'Fresh Catch'
        }
      ]
    },
    {
      id: 4,
      category: 'Sweet Shops',
      icon: FaBirthdayCake,
      items: [
        {
          name: 'Sweet Paradise',
          image: 'https://images.unsplash.com/photo-1516919549054-e08258825f80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
          rating: 4.9,
          speciality: 'Traditional Sweets',
          bestseller: 'Kaju Katli'
        },
        {
          name: 'Royal Sweets',
          image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
          rating: 4.7,
          speciality: 'Bengali Sweets',
          bestseller: 'Rasgulla'
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Venues</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {venues.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <category.icon className="w-8 h-8 text-[#2ecc71]" />
                  <h3 className="text-2xl font-semibold ml-3">{category.category}</h3>
                </div>
                <div className="space-y-6">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-24 h-24">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{item.name}</h4>
                        <div className="flex items-center mt-1">
                          <FaStar className="text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                        </div>
                        {item.location && (
                          <p className="text-sm text-gray-600 mt-1">{item.location}</p>
                        )}
                        {item.capacity && (
                          <p className="text-sm text-gray-600">Capacity: {item.capacity}</p>
                        )}
                        {item.features && (
                          <p className="text-sm text-gray-600">{item.features}</p>
                        )}
                        {item.cuisine && (
                          <p className="text-sm text-gray-600">{item.cuisine}</p>
                        )}
                        {item.speciality && (
                          <p className="text-sm text-gray-600">
                            {item.speciality}
                            {item.bestseller && ` • ${item.bestseller}`}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedVenues;
