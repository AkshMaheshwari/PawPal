import React from 'react';

const TeamCard = ({ name, role, image }) => {
  return (
    <div className="bg-white shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-300">
      <img
        src={image}
        alt={name}
        className="object-cover rounded-full mx-auto mb-4"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
};

export default TeamCard;
