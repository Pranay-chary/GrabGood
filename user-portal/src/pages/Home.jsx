import React from 'react';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaTruck, FaUsers, FaHeart, FaCheckCircle, FaHandsHelping, FaLeaf, FaBriefcase } from 'react-icons/fa';
import Hero from '../components/Hero';
import DonorShowcase from '../components/DonorShowcase';
import FeaturedVenues from '../components/FeaturedVenues';

const Home = () => {
  const features = [
    {
      icon: FaHandHoldingHeart,
      title: 'Easy Donation Process',
      description: 'Simple steps to donate surplus food from your establishment'
    },
    {
      icon: FaTruck,
      title: 'Quick Pickup',
      description: 'Efficient collection and delivery system'
    },
    {
      icon: FaUsers,
      title: 'Wide Network',
      description: 'Connected with numerous NGOs and shelters'
    }
  ];

  const testimonials = [
    {
      name: 'Raj Kumar',
      role: 'Hotel Manager',
      content: 'GrabGood has made it incredibly easy for us to donate surplus food. Their service is prompt and professional.'
    },
    {
      name: 'Priya Singh',
      role: 'NGO Director',
      content: 'Thanks to GrabGood, we can now feed more people in need. The platform has streamlined the entire process.'
    }
  ];

  const whyDonate = [
    {
      icon: FaHandsHelping,
      title: 'Fighting Hunger',
      description: 'Food donation directly addresses hunger in underserved communities, providing essential nutrition to those who might otherwise go without meals. By donating surplus food, we create a bridge between abundance and scarcity, ensuring that nutritious meals reach those who need them most.'
    },
    {
      icon: FaLeaf,
      title: 'Reducing Food Waste',
      description: 'Nearly one-third of all food produced globally goes to waste. By donating excess food instead of discarding it, we significantly reduce environmental impact, including methane emissions from landfills and wasted resources used in food production.'
    },
    {
      icon: FaBriefcase,
      title: 'Building Community',
      description: 'Food donation initiatives bring communities together, fostering relationships between businesses, volunteers, and recipients. These connections strengthen social bonds and create a culture of generosity and mutual support.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">Our Mission</h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-10">
                At GrabGood, we bridge the gap between food surplus and hunger, creating a sustainable ecosystem where excess food from businesses reaches those in need. Join us in our mission to eliminate food waste while nurturing communities through the power of shared meals.
              </p>
              <div className="w-24 h-1 bg-[#2ecc71] mx-auto"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donor Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Donations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These generous contributions are making a real difference in our communities
            </p>
          </motion.div>
          <div className="max-w-5xl mx-auto">
            <DonorShowcase />
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <FeaturedVenues />

      {/* Why Food Donation is Important */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Why Food Donation is Important</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your contribution makes a meaningful impact in multiple ways
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {whyDonate.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#2ecc71] bg-opacity-20 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="text-[#2ecc71] text-3xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple process to make a big difference
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center p-6 relative"
            >
              <div className="bg-[#2ecc71] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold relative z-10">1</div>
              <div className="hidden md:block absolute top-[3.5rem] left-1/2 w-full h-1 bg-[#2ecc71]" style={{ zIndex: 0 }}></div>
              <h3 className="text-2xl font-bold mb-4">Register Your Business</h3>
              <p className="text-gray-600">Sign up as a food donor and complete your profile</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center p-6 relative"
            >
              <div className="bg-[#2ecc71] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold relative z-10">2</div>
              <div className="hidden md:block absolute top-[3.5rem] left-1/2 w-full h-1 bg-[#2ecc71]" style={{ zIndex: 0 }}></div>
              <h3 className="text-2xl font-bold mb-4">List Available Food</h3>
              <p className="text-gray-600">Add details about surplus food quantity and pickup time</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center p-6"
            >
              <div className="bg-[#2ecc71] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
              <h3 className="text-2xl font-bold mb-4">Quick Collection</h3>
              <p className="text-gray-600">Our volunteers will collect and distribute the food</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Why Choose GrabGood?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make food donation simple, efficient, and impactful
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="text-center p-8 rounded-lg shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-16 h-16 text-[#2ecc71] mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">What Our Partners Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the organizations that work with us
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white p-8 rounded-lg shadow-lg relative"
              >
                <div className="mb-6 text-[#2ecc71] text-5xl opacity-20 absolute top-4 left-6">"</div>
                <p className="text-gray-700 mb-6 text-lg relative z-10">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Join our mission to reduce food waste and help those in need. Every donation creates a meaningful impact in someone's life.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#2ecc71] px-10 py-4 rounded-md font-bold text-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Donate Food
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-md font-bold text-xl hover:bg-white hover:text-[#2ecc71] transition-colors shadow-lg"
              >
                Partner with Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;