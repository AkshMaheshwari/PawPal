import React from 'react'
import DonateSection from '../Components/DonateSection.jsx'
import { Heart, ShieldCheck, Star } from 'lucide-react';

function handleClick() {
  window.location.href = "/donate";
}

const donateOptions = [
  {
    icon: Heart,
    title: "Food and Supplies",
    description: "Your donation helps us provide essential food and supplies for our animals."
  },
  {
    icon: ShieldCheck,
    title: "Medical Care",
    description: "Your support ensures that our animals receive the medical care they need."
  },
  {
    icon: Star,
    title: "Shelter and Comfort",
    description: "Help us provide a safe and comfortable shelter for our animals."
  }
];

const Donate = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-extrabold text-yellow-600 tracking-tight">
            <a href="/">PawPal</a>
          </h1>
          <nav className="hidden md:flex space-x-6 text-base font-medium">
            <a href="/about" className="hover:text-yellow-600">About</a>
            <a href="/pets" className="hover:text-yellow-600">Pets</a>
            <a href="/contact" className="hover:text-yellow-600">Contact</a>
            <a href="/donate" className="hover:text-yellow-600">Donate</a>
            <a
              href="/auth/google"
              className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 font-semibold"
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* Support Our Mission */}
      <section className="p-8 md:p-16 bg-gray-50">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-900 leading-tight">
          Support Our Mission
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed text-center mb-6">
          Your generous donation helps us provide care, shelter, and love to animals in need. Every contribution, no matter the size, makes a significant difference in their lives.
        </p>
        <button
          className="block mx-auto px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-700 font-semibold"
          onClick={handleClick}
        >
          Donate Now
        </button>
      </section>

      {/* How Your Donation Helps */}
      <section className="p-8 md:p-16 bg-gray-50">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-900 leading-tight">
          How Your Donation Helps
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed text-center mb-6">
          Your support directly impacts the lives of animals in our care. Here's how your donation makes a difference:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {donateOptions.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <DonateSection
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Donate;
