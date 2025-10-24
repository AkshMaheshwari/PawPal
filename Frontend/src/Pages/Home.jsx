import React, { useState } from 'react';
import { FaPaw, FaHeart, FaCheckCircle, FaDog, FaArrowRight, FaStar, FaShieldAlt, FaBars, FaTimes } from 'react-icons/fa';
import { GiCat, GiRabbit } from 'react-icons/gi';
import { MdPets, MdVerified, MdLocationOn } from 'react-icons/md';

const featuredPets = [
  { 
    id: 1, 
    name: 'Buddy', 
    age: '2 yrs', 
    type: 'Dog', 
    icon: <FaDog className="text-yellow-500 text-5xl mx-auto" />, 
    rating: 4.8,
    location: 'Mumbai'
  },
  { 
    id: 2, 
    name: 'Milo', 
    age: '1 yr', 
    type: 'Cat', 
    icon: <GiCat className="text-yellow-500 text-5xl mx-auto" />, 
    rating: 4.9,
    location: 'Pune'
  },
  { 
    id: 3, 
    name: 'Snowy', 
    age: '3 yrs', 
    type: 'Rabbit', 
    icon: <GiRabbit className="text-yellow-500 text-5xl mx-auto" />, 
    rating: 4.7,
    location: 'Mumbai'
  },
  { 
    id: 4, 
    name: 'Oscar', 
    age: '1 yr', 
    type: 'Dog', 
    icon: <FaDog className="text-yellow-500 text-5xl mx-auto" />, 
    rating: 4.6,
    location: 'Pune'
  },
];

const stats = [
  { number: '500+', label: 'Pets Rescued', icon: <FaPaw className="text-yellow-500 text-2xl" /> },
  { number: '300+', label: 'Happy Families', icon: <FaHeart className="text-pink-500 text-2xl" /> },
  { number: '50+', label: 'Partner Shelters', icon: <FaShieldAlt className="text-green-500 text-2xl" /> },
  { number: '24/7', label: 'Support Available', icon: <MdVerified className="text-blue-500 text-2xl" /> },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-amber-50 text-gray-800 font-sans min-h-screen">
      {/* Enhanced Navbar with Glass Effect */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-yellow-100/50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaPaw className="text-white text-lg" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              <a href="/">PawPal</a>
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="/about" className="text-gray-600 hover:text-yellow-600 transition-all duration-300 relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a href="/contact" className="text-gray-600 hover:text-yellow-600 transition-all duration-300 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a href="/donate" className="text-gray-600 hover:text-yellow-600 transition-all duration-300 relative group">
              Donate
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a
              href="/user/signup"
              className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-2.5 rounded-full hover:from-yellow-600 hover:to-amber-600 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-yellow-600 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-yellow-100/50">
            <nav className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              <a href="/about" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300 py-2 font-medium">
                About
              </a>
              <a href="/contact" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300 py-2 font-medium">
                Contact
              </a>
              <a href="/donate" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300 py-2 font-medium">
                Donate
              </a>
              <a
                href="/user/signup"
                className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-3 rounded-full hover:from-yellow-600 hover:to-amber-600 font-semibold shadow-lg text-center"
              >
                Get Started
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section with Enhanced Design */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 to-amber-100/30"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-yellow-700 px-4 py-2 rounded-full text-sm font-medium shadow-md">
                <MdPets className="text-yellow-600" />
                India's Trusted Pet Adoption Platform
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Every Pet Deserves a{' '}
                <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Loving Home
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Connect with verified shelters across Mumbai & Pune. Find your perfect companion and give them the love they deserve.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2" onClick={() => window.location.href = "/user/login"}>
                  Start Adoption Journey
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="border-2 border-yellow-500 text-yellow-600 px-8 py-4 rounded-2xl font-semibold hover:bg-yellow-50 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Image with floating elements */}
            <div className="relative">
              <div className="relative">
                <img 
                  src="/Pet and Family.jpg" 
                  alt="Happy pet and adopter" 
                  className="w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Floating Stats */}
                <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                  <div className="text-2xl font-bold text-yellow-600">500+</div>
                  <div className="text-sm text-gray-600">Pets Rescued</div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Cards */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-yellow-600">PawPal?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to making pet adoption simple, safe, and successful for everyone involved.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaCheckCircle className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Verified Shelters</h3>
              <p className="text-gray-600 leading-relaxed">
                All our partner shelters are thoroughly verified and regularly inspected to ensure the highest standards of animal care.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaHeart className="text-pink-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Easy Adoption</h3>
              <p className="text-gray-600 leading-relaxed">
                Our streamlined process makes pet adoption simple and stress-free for both families and shelters.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaPaw className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Complete Profiles</h3>
              <p className="text-gray-600 leading-relaxed">
                Detailed pet profiles with health records, temperament, and high-quality photos to help you find your perfect match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our <span className="text-yellow-600">Featured Pets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These adorable companions are waiting for their forever homes
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPets.map(pet => (
              <div key={pet.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="p-6 text-center">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {pet.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pet.name}</h3>
                  <p className="text-gray-500 mb-3">{pet.age} • {pet.type}</p>
                  
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <FaStar className="text-yellow-400" />
                    <span className="text-sm font-medium text-gray-600">{pet.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <MdLocationOn className="text-gray-400 text-sm" />
                    <span className="text-sm text-gray-500">{pet.location}</span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-3 rounded-2xl font-semibold hover:from-yellow-600 hover:to-amber-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Meet {pet.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Companion?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of happy families who found their furry friends through PawPal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-yellow-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
              Browse Available Pets
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300">
              Become a Partner Shelter
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                  <FaPaw className="text-white text-lg" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-500">PawPal</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Making pet adoption simple, safe, and successful for everyone involved.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 block">About Us</a>
                <a href="/pets" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 block">Find Pets</a>
                <a href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 block">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="/donate" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 block">Donate</a>
                <a href="/volunteer" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 block">Volunteer</a>
                <a href="/faq" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 block">FAQ</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 block">Privacy Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 block">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 PawPal. All rights reserved. Made with ❤️ for animals in need.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}