import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaCheck } from 'react-icons/fa';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    pickupAddress: '',
    pickupDate: '',
    pickupTime: '',
    donorName: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          foodType: '',
          quantity: '',
          pickupAddress: '',
          pickupDate: '',
          pickupTime: '',
          donorName: '',
          phone: '',
          email: '',
          notes: ''
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('Failed to submit donation. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={formVariants}
      className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-xl border border-gray-100"
    >
      {isSubmitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10"
        >
          <div className="bg-green-100 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
            <FaCheck className="text-[#2ecc71] text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600 text-lg">Your donation has been submitted successfully.</p>
          <p className="text-gray-600 mt-2">We will contact you shortly to confirm the pickup.</p>
        </motion.div>
      ) : (
        <>
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <div className="inline-block bg-green-100 p-3 rounded-full mb-4">
              <FaHandHoldingHeart className="text-[#2ecc71] text-3xl" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Donate Food</h2>
            <p className="text-gray-600 text-lg">Fill out the form below to schedule a food pickup</p>
          </motion.div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">Food Type</label>
                <input
                  type="text"
                  name="foodType"
                  value={formData.foodType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent transition-all"
                  placeholder="E.g., Cooked meals, Vegetables, etc."
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">Quantity (servings)</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent transition-all"
                  placeholder="Number of servings"
                  required
                />
              </motion.div>

              <motion.div className="md:col-span-2" variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">Pickup Address</label>
                <textarea
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent transition-all"
                  rows="3"
                  placeholder="Complete address for food pickup"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">Pickup Date</label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent transition-all"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">Pickup Time</label>
                <input
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent transition-all"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  name="donorName"
                  value={formData.donorName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent transition-all"
                  placeholder="Your full name"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent transition-all"
                  placeholder="Your contact number"
                  required
                />
              </motion.div>

              <motion.div className="md:col-span-2" variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent transition-all"
                  placeholder="Your email address"
                  required
                />
              </motion.div>

              <motion.div className="md:col-span-2" variants={itemVariants}>
                <label className="block text-gray-700 font-medium mb-2">Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-transparent transition-all"
                  rows="3"
                  placeholder="Any special instructions or information"
                />
              </motion.div>
            </div>

            <motion.div 
              className="mt-8 text-center"
              variants={itemVariants}
            >
              <motion.button
                type="submit"
                className="bg-[#2ecc71] text-white px-10 py-3 rounded-md text-xl font-medium hover:bg-[#27ae60] transition-colors shadow-md hover:shadow-lg inline-block"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Donation
              </motion.button>
            </motion.div>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default DonationForm;
