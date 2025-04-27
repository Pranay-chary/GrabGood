import React from 'react';
import { motion } from 'framer-motion';
import DonationForm from '../components/DonationForm';
import { FaHandHoldingHeart, FaRegClock, FaRegCheckCircle } from 'react-icons/fa';

const Donations = () => {
  const stats = [
    { value: "10,000+", label: "Meals Donated" },
    { value: "500+", label: "Businesses" },
    { value: "50+", label: "NGO Partners" }
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Make a Food Donation
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8"
            >
              Your surplus food can make a difference in someone's life
            </motion.p>
            
            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                  className="bg-white bg-opacity-20 rounded-lg py-6 px-4 backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Three simple steps to make your donation count
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaHandHoldingHeart className="w-8 h-8 text-[#2ecc71]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Fill the Form</h3>
                <p className="text-gray-600">
                  Provide details about your food donation and preferred pickup time.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaRegClock className="w-8 h-8 text-[#2ecc71]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Schedule Pickup</h3>
                <p className="text-gray-600">
                  Our volunteers will arrive at your location at the scheduled time.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaRegCheckCircle className="w-8 h-8 text-[#2ecc71]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Track Impact</h3>
                <p className="text-gray-600">
                  Get updates on how your donation helped the community.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <DonationForm />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-white rounded-lg p-8 shadow-md border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Important Guidelines</h3>
              <ul className="space-y-4 max-w-3xl mx-auto">
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <FaHandHoldingHeart className="text-[#2ecc71] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Food Quality</h4>
                    <p className="text-gray-600">Food should be fresh and fit for consumption</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <FaHandHoldingHeart className="text-[#2ecc71] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Packaging</h4>
                    <p className="text-gray-600">Package the food properly to maintain quality during transport</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <FaHandHoldingHeart className="text-[#2ecc71] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Timing</h4>
                    <p className="text-gray-600">Preferably schedule pickups within 2-3 hours of food preparation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <FaHandHoldingHeart className="text-[#2ecc71] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Minimum Quantity</h4>
                    <p className="text-gray-600">Minimum donation quantity: 10 servings</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <FaHandHoldingHeart className="text-[#2ecc71] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Containers</h4>
                    <p className="text-gray-600">Our team will provide proper food safety containers if needed</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-10">Your Donation Makes a Difference</h2>
              <div className="relative p-8 bg-gray-50 rounded-lg shadow-md mb-8">
                <div className="text-[#2ecc71] text-6xl opacity-20 absolute top-4 left-8">"</div>
                <p className="text-xl text-gray-700 italic relative z-10">
                  Thanks to regular donations from restaurants and hotels, we're now able to provide nutritious meals to over 200 children every day. The joy on their faces when they receive a warm meal is priceless.
                </p>
                <div className="mt-6">
                  <div className="font-bold text-lg">Rohit Sharma</div>
                  <div className="text-[#2ecc71]">Director, Happy Children Foundation</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donations;
