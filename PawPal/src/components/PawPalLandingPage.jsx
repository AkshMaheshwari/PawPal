/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FaPaw, FaHeart, FaCheckCircle } from 'react-icons/fa';

const featuredPets = [
  { id: 1, name: 'Buddy', age: '2 yrs', type: 'Dog', img: '/images/buddy.jpg' },
  { id: 2, name: 'Milo', age: '1 yr', type: 'Cat', img: '/images/milo.jpg' },
  { id: 3, name: 'Snowy', age: '3 yrs', type: 'Rabbit', img: '/images/snowy.jpg' },
  { id: 4, name: 'Bella', age: '4 yrs', type: 'Dog', img: '/images/bella.jpg' },
];

export default function PawPalLandingPage() {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-yellow-600">PawPal</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-yellow-600">Features</a>
            <a href="#pets" className="hover:text-yellow-600">Pets</a>
            <a href="#about" className="hover:text-yellow-600">About</a>
            <a href="#testimonials" className="hover:text-yellow-600">Testimonials</a>
            <a href="#signup" className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600">Start Adopting</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-16 bg-white">
        <img src="/images/hero-pet.jpg" alt="Happy pet and adopter" className="w-full md:w-1/2 rounded-3xl shadow-lg" />
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Every Pet Deserves a Loving Home. <br />
            <span className="text-yellow-600">Adopt a Pet Today</span>
          </h2>
          <p className="text-lg text-gray-700">Browse our available animals and learn more about the adoption process. Together, we can <strong className="font-semibold">rescue, rehabilitate</strong>, and <strong className="font-semibold">rehome pets in need</strong>.</p>
          <a href="#signup" className="inline-block px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600">Start Adopting</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="p-8 md:p-16 bg-gray-50">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Why Choose PawPal?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <FaCheckCircle className="text-green-500 text-3xl" />
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2">Verified Shelters</h4>
            <p className="text-gray-600">We work with trusted, verified shelters in Mumbai & Pune.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <div className="bg-pink-100 p-4 rounded-full">
                <FaHeart className="text-pink-400 text-3xl" />
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2">Easy Adoptions</h4>
            <p className="text-gray-600">Simplified adoption process tailored for both families and shelters.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-100 p-4 rounded-full">
                <FaPaw className="text-yellow-500 text-3xl" />
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2">Pet Profiles</h4>
            <p className="text-gray-600">View photos, medical info, and more for each pet.</p>
          </div>
        </div>
      </section>

      {/* Pet Showcase */}
      <section id="pets" className="p-8 md:p-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Meet Our Featured Pets</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredPets.map(pet => (
            <div key={pet.id} className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <img src={pet.img} alt={pet.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800">{pet.name}</h4>
                <p className="text-sm text-gray-500">{pet.age} • {pet.type}</p>
                <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600">Adopt Me</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="p-8 md:p-16 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">How PawPal Works</h3>
        <p className="max-w-2xl mx-auto text-gray-700">PawPal connects adopters with verified animal shelters in Mumbai and Pune. Browse pets, view detailed profiles, and submit adoption requests — all in one place. We believe in making adoption easy, transparent, and joyful.</p>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="p-8 md:p-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Happy Adopters Say...</h3>
        <div className="space-y-6 max-w-3xl mx-auto text-center text-gray-700">
          <blockquote className="italic">“PawPal helped us find the perfect companion for our daughter. So grateful!” — Rina, Mumbai</blockquote>
          <blockquote className="italic">“The process was super smooth and the shelter was very helpful. Highly recommend!” — Aarav, Pune</blockquote>
        </div>
      </section>

      {/* Call to Action */}
      <section id="signup" className="p-8 md:p-16 bg-yellow-500 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Adopt or Help a Pet?</h3>
        <p className="mb-6">Sign in with your Google account and get started in just a few clicks.</p>
        <a href="/auth/google" className="px-6 py-3 bg-white text-yellow-600 rounded-full font-semibold hover:bg-gray-100">Sign in with Google</a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center p-6 text-sm text-gray-500">
        <p>&copy; 2025 PawPal. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}