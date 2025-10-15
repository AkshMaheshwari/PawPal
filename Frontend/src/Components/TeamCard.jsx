/* eslint-disable no-unused-vars */
// src/Components/TeamCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const TeamCard = ({ name, role, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3, boxShadow: "0 15px 20px -5px rgba(245, 158, 11, 0.1)" }}
      // Styling: Yellow background/border accent, large rounded corners
      className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-yellow-400/80 transition-all duration-300 text-center"
    >
      {/* Image Styling: Circular with a yellow ring and shadow */}
      <div className="relative mx-auto w-32 h-32 mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-full border-4 border-yellow-300 shadow-xl"
        />
        {/* Subtle decorative paw print badge */}
        <div className="absolute bottom-0 right-0 p-1 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full shadow-lg">
            <FaPaw className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-1">
        {name}
      </h3>
      
      {/* Role Styling: Yellow text for emphasis */}
      <p className="text-sm font-semibold text-yellow-600">
        {role}
      </p>
    </motion.div>
  );
};

// NOTE: You must ensure FaPaw is imported into this file as well.
import { FaPaw } from 'react-icons/fa'; 

export default TeamCard;