import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaUsers, FaHandHoldingHeart, FaRegLightbulb, FaHeart } from 'react-icons/fa';
import Card from '../components/Card';

const Community = () => {
  const [activeTab, setActiveTab] = useState('stories');

  const stories = [
    {
      title: "Hotel Grand's Monthly Food Drive",
      description: "Every month, we donate surplus food from our banquets to local orphanages. Last month, we served over 1,000 meals!",
      image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      author: "Raj Sharma, Hotel Grand",
      date: "April 15, 2025",
      type: "testimonial"
    },
    {
      title: "Sweet Shop Owner's Initiative",
      description: "We've started donating unsold sweets to nearby shelters. The joy on children's faces is priceless.",
      image: "https://images.unsplash.com/photo-1516919549054-e08258825f80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      author: "Priya Patel, Patel Sweets",
      date: "April 12, 2025",
      type: "testimonial"
    }
  ];

  const challenges = [
    {
      title: "#GrabGoodChallenge",
      description: "Join our monthly challenge! Donate food and share your story with #GrabGoodChallenge.",
      image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      link: "/challenge",
      type: "donor"
    },
    {
      title: "Corporate Challenge",
      description: "Companies competing to make the biggest impact through food donations.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      link: "/corporate",
      type: "donor"
    }
  ];

  const volunteers = [
    {
      name: "Ananya Sharma",
      role: "Student Volunteer",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      quote: "Volunteering with GrabGood has opened my eyes to the impact of food waste and the power of community action. Every weekend I help collect donations, and it's become the most meaningful part of my week."
    },
    {
      name: "Vikram Mehta",
      role: "Retired Teacher",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      quote: "After retiring, I wanted to give back to society. Coordinating food pickups for GrabGood gives me purpose while helping reduce hunger in our community."
    },
    {
      name: "Neha Gupta",
      role: "Corporate Professional",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      quote: "Even with my busy schedule, I dedicate one evening a week to GrabGood deliveries. It's a small commitment that makes a big difference, and my company supports my volunteer work."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
            alt="Community hands" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Our GrabGood Community
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-10"
            >
              Join a network of passionate individuals and organizations working together to reduce food waste and eliminate hunger
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2ecc71] text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#27ae60] transition-colors"
            >
              Join Our Community
            </motion.button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-6">Why Join Our Community?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of a movement that's making a real difference in people's lives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-8 rounded-lg text-center"
            >
              <FaUsers className="text-4xl text-[#2ecc71] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Connect with Others</h3>
              <p className="text-gray-600">
                Join a network of like-minded individuals and organizations passionate about food sustainability and helping others
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 p-8 rounded-lg text-center"
            >
              <FaHandHoldingHeart className="text-4xl text-[#2ecc71] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Make an Impact</h3>
              <p className="text-gray-600">
                See the direct results of your contributions and how they're helping to reduce hunger in your community
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 p-8 rounded-lg text-center"
            >
              <FaRegLightbulb className="text-4xl text-[#2ecc71] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Share Ideas</h3>
              <p className="text-gray-600">
                Contribute your knowledge and creativity to develop innovative solutions to food waste and distribution challenges
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row border-b border-gray-200 mb-12">
            <button
              className={`px-8 py-4 font-semibold text-lg ${
                activeTab === 'stories'
                  ? 'text-[#2ecc71] border-b-2 border-[#2ecc71]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('stories')}
            >
              Success Stories
            </button>
            <button
              className={`px-8 py-4 font-semibold text-lg ${
                activeTab === 'challenge'
                  ? 'text-[#2ecc71] border-b-2 border-[#2ecc71]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('challenge')}
            >
              #GrabGoodChallenge
            </button>
            <button
              className={`px-8 py-4 font-semibold text-lg ${
                activeTab === 'volunteers'
                  ? 'text-[#2ecc71] border-b-2 border-[#2ecc71]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('volunteers')}
            >
              Our Volunteers
            </button>
          </div>

          {activeTab === 'stories' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {stories.map((story, index) => (
                  <Card key={index} {...story}>
                    <div className="mt-4 flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                      <div>
                        <div className="font-bold">{story.author}</div>
                        <div className="text-sm text-gray-600">{story.date}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#2ecc71] text-white px-8 py-3 rounded-md hover:bg-[#27ae60] font-semibold shadow-md"
                >
                  Share Your Story
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'challenge' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white rounded-lg p-10 mb-12">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold mb-6">Join the #GrabGoodChallenge</h2>
                  <p className="text-xl mb-8">
                    Make a difference in your community by participating in our monthly food donation challenge.
                    Share your donation story with #GrabGoodChallenge and inspire others!
                  </p>
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white bg-opacity-20 px-6 py-4 rounded-lg text-center">
                      <div className="text-3xl font-bold">1,000+</div>
                      <div className="text-sm">Participants</div>
                    </div>
                    <div className="bg-white bg-opacity-20 px-6 py-4 rounded-lg text-center">
                      <div className="text-3xl font-bold">5,000+</div>
                      <div className="text-sm">Meals Donated</div>
                    </div>
                    <div className="bg-white bg-opacity-20 px-6 py-4 rounded-lg text-center">
                      <div className="text-3xl font-bold">50+</div>
                      <div className="text-sm">Cities</div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#2ecc71] px-8 py-3 rounded-md font-semibold shadow-md"
                  >
                    Start Your Challenge
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {challenges.map((challenge, index) => (
                  <Card key={index} {...challenge} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'volunteers' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-4xl mx-auto mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Meet Our Amazing Volunteers</h3>
                <p className="text-lg text-gray-600 text-center mb-10">
                  Our volunteers are the heart of GrabGood, dedicating their time and energy to make our mission possible
                </p>

                <div className="space-y-12">
                  {volunteers.map((volunteer, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="flex flex-col md:flex-row gap-8 bg-gray-50 p-8 rounded-lg"
                    >
                      <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                        <img src={volunteer.image} alt={volunteer.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[#2ecc71] mb-2">
                          <FaQuoteLeft className="text-xl opacity-60" />
                        </div>
                        <p className="text-gray-700 text-lg italic mb-4">
                          {volunteer.quote}
                        </p>
                        <div className="font-bold text-xl">{volunteer.name}</div>
                        <div className="text-[#2ecc71]">{volunteer.role}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#2ecc71] text-white px-8 py-4 rounded-md font-semibold hover:bg-[#27ae60] transition-colors shadow-md"
                  >
                    Become a Volunteer <FaHeart className="inline ml-2" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Community;
