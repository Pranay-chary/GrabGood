import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaHeart,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHandHoldingHeart
} from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebook, url: 'https://facebook.com/grabgood', name: 'Facebook' },
    { icon: FaTwitter, url: 'https://twitter.com/grabgood', name: 'Twitter' },
    { icon: FaInstagram, url: 'https://instagram.com/grabgood', name: 'Instagram' },
    { icon: FaLinkedin, url: 'https://linkedin.com/company/grabgood', name: 'LinkedIn' },
    { icon: FaYoutube, url: 'https://youtube.com/c/grabgood', name: 'YouTube' }
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Donate Food', path: '/donate' },
    { name: 'Partner with Us', path: '/partner' },
    { name: 'Community', path: '/community' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    { name: 'Function Halls', path: '/halls' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Sweet Shops', path: '/sweet-shops' }
  ];

  const impactStats = [
    { value: "15,000+", label: "Lives Changed" },
    { value: "50,000+", label: "Meals Served" },
    { value: "200+", label: "Volunteers" },
    { value: "1,000+", label: "Supporters" }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Stats Section */}
      <div className="bg-[#2ecc71] py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-white bg-opacity-10 py-6 px-4 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">GrabGood</h3>
            <p className="mb-6 text-lg leading-relaxed">
              Connecting food producers with those in need. Making a difference, one meal at a time.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2ecc71] transition-colors text-xl"
                  title={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative">
              <span className="inline-block pb-2 relative">
                Quick Links
                <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#2ecc71]"></span>
              </span>
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="hover:text-[#2ecc71] transition-colors text-lg flex items-center"
                  >
                    <FaHandHoldingHeart className="mr-2 text-[#2ecc71] text-sm" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative">
              <span className="inline-block pb-2 relative">
                Our Services
                <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#2ecc71]"></span>
              </span>
            </h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="hover:text-[#2ecc71] transition-colors text-lg flex items-center"
                  >
                    <FaHandHoldingHeart className="mr-2 text-[#2ecc71] text-sm" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative">
              <span className="inline-block pb-2 relative">
                Contact Us
                <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#2ecc71]"></span>
              </span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaPhoneAlt className="w-5 h-5 mr-3 text-[#2ecc71]" />
                <span className="text-lg">+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="w-5 h-5 mr-3 text-[#2ecc71]" />
                <a href="mailto:contact@grabgood.org" className="hover:text-[#2ecc71] transition-colors text-lg">
                  contact@grabgood.org
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="w-5 h-5 mr-3 text-[#2ecc71] mt-1" />
                <span className="text-lg">123 Food Street, Charity Road<br />Mumbai, Maharashtra 400001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 border-t border-gray-800 pt-10">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-bold text-white mb-4">Join Our Newsletter</h4>
            <p className="text-lg mb-6">Stay updated with our latest news and initiatives</p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="px-4 py-3 rounded-md focus:outline-none text-gray-800 w-full max-w-md"
              />
              <button 
                type="submit" 
                className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} GrabGood. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-sm">Made with</span>
              <FaHeart className="w-4 h-4 mx-2 text-red-500" />
              <span className="text-sm">in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
