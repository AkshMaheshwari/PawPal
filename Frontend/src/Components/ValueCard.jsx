/* eslint-disable no-unused-vars */
// src/Components/ValueCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ValueCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(245, 158, 11, 0.1), 0 10px 10px -5px rgba(245, 158, 11, 0.04)" }}
      // Styling matches the "Impact" cards on the Donate page
      className="bg-white p-8 rounded-3xl shadow-xl border border-yellow-100/50 transition-all duration-300 flex flex-col items-center text-center"
    >
      {/* Icon Styling: Gradient background, large, rounded */}
      <div className="w-16 h-16 mb-4 p-3 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
        {/* The Icon prop must be a Lucide React component */}
        <Icon className="text-white w-8 h-8" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default ValueCard;