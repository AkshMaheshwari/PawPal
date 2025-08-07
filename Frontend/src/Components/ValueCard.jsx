/* eslint-disable no-unused-vars */
import React from 'react';

const ValueCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-b-full bg-gray-50 hover:bg-yellow-50 transition">
      <div className="text-yellow-600 text-3xl">
        <Icon />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ValueCard;
