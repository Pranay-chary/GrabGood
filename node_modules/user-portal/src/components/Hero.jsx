import React from 'react';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaUsers, FaHandsHelping } from 'react-icons/fa';

const Hero = () => {
  const heroImage = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80';

  const stats = [
    { icon: FaHandHoldingHeart, value: '10K+', label: 'Meals Donated' },
    { icon: FaUsers, value: '500+', label: 'Partners' },
    { icon: FaHandsHelping, value: '50+', label: 'Cities' },
  ];

  return (
    <div className="relative min-h-[90vh] bg-gray-900 overflow-hidden">
      <motion.img
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10 }}
        src={heroImage}
        alt="Food donation"
        className="absolute w-full h-full object-cover opacity-40"
      />
      <div className="relative z-10 container mx-auto px-4 h-full py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(80vh-80px)]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Bridging Food Surplus with Hunger
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl"
            >
              Join us in our mission to eliminate food waste and combat hunger in underserved communities. With your support, we can ensure that surplus food reaches those who need it most, creating a sustainable cycle of giving and nourishment.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/donate"
                className="bg-[#2ecc71] text-white px-10 py-4 rounded-md text-xl font-semibold hover:bg-[#27ae60] text-center transition-colors duration-200 shadow-lg"
              >
                Donate Now
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/partner"
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-md text-xl font-semibold hover:bg-white hover:text-[#2ecc71] text-center transition-colors duration-200 shadow-lg"
              >
                Partner With Us
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:grid grid-cols-1 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 flex items-center space-x-4 border border-white border-opacity-20"
              >
                <stat.icon className="text-[#2ecc71] text-5xl" />
                <div>
                  <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
                  <p className="text-xl text-gray-300">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white text-center"
        >
          <div className="w-8 h-12 border-2 border-white rounded-full mx-auto mb-2 flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
          <p className="text-sm">Scroll to explore</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
