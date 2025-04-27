import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const Card = ({ title, description, image, link, type = 'default', children }) => {
  const cardStyles = {
    donor: 'border-[#2ecc71] hover:border-[#2ecc71] hover:shadow-[0_0_15px_rgba(46,204,113,0.3)]',
    service: 'border-[#e67e22] hover:border-[#e67e22] hover:shadow-[0_0_15px_rgba(230,126,34,0.3)]',
    testimonial: 'border-gray-200 hover:border-[#2ecc71]',
    default: 'border-gray-200 hover:border-[#2ecc71]'
  };

  const titleColor = {
    donor: 'text-[#2ecc71]',
    service: 'text-[#e67e22]',
    testimonial: 'text-gray-800',
    default: 'text-gray-800'
  };

  return (
    <motion.div 
      className={`
        bg-white p-6 rounded-lg border-2 transition-all duration-300
        hover:shadow-xl ${cardStyles[type] || cardStyles.default}
      `}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {image && (
        <div className="mb-5 overflow-hidden rounded-lg">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-52 object-cover rounded-lg transition-transform duration-500 hover:scale-110" 
          />
        </div>
      )}
      
      <h3 className={`text-xl font-bold mb-3 ${titleColor[type] || titleColor.default}`}>
        {title}
      </h3>
      
      <p className="text-gray-600 mb-5 leading-relaxed">
        {description}
      </p>
      
      {children}
      
      {link && (
        <motion.a 
          href={link} 
          className={`inline-flex items-center ${
            type === 'donor' ? 'text-[#2ecc71]' : 
            type === 'service' ? 'text-[#e67e22]' : 
            'text-[#2ecc71]'
          } hover:opacity-80 font-medium`}
          whileHover={{ x: 5 }}
        >
          Learn More <FaArrowRight className="ml-2 text-sm" />
        </motion.a>
      )}
    </motion.div>
  );
};

export default Card;
