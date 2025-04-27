import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const DonorShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const donors = [
    {
      id: 1,
      name: 'Taj Palace',
      type: 'Hotel',
      amount: '150 meals',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      location: 'Mumbai',
      date: 'Today'
    },
    {
      id: 2,
      name: 'Royal Wedding Hall',
      type: 'Function Hall',
      amount: '300 meals',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1746&q=80',
      location: 'Delhi',
      date: '2 hours ago'
    },
    {
      id: 3,
      name: 'Spice Garden',
      type: 'Restaurant',
      amount: '75 meals',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      location: 'Bangalore',
      date: '4 hours ago'
    },
    {
      id: 4,
      name: 'Sweet Paradise',
      type: 'Sweet Shop',
      amount: '100 sweets boxes',
      image: 'https://images.unsplash.com/photo-1516919549054-e08258825f80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      location: 'Chennai',
      date: 'Yesterday'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % donors.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-white rounded-lg shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={donors[currentIndex].image}
              alt={donors[currentIndex].name}
              className="object-cover w-full h-64 rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="absolute bottom-0 w-full p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{donors[currentIndex].name}</h3>
                <p className="text-gray-300">{donors[currentIndex].type}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold">{donors[currentIndex].amount}</p>
                <p className="text-gray-300">{donors[currentIndex].date}</p>
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <FaHeart className="mr-2 text-red-500" />
              <span>Making a difference in {donors[currentIndex].location}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {donors.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DonorShowcase;
