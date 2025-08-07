import React from 'react';
import { FaPaw, FaHeart, FaCheckCircle, FaDog } from 'react-icons/fa';
import { GiCat, GiRabbit } from 'react-icons/gi';

const featuredPets = [
  { id: 1, name: 'Buddy', age: '2 yrs', type: 'Dog', icon: <FaDog className="text-yellow-500 text-5xl mx-auto" /> },
  { id: 2, name: 'Milo', age: '1 yr', type: 'Cat', icon: <GiCat className="text-yellow-500 text-5xl mx-auto" /> },
  { id: 3, name: 'Snowy', age: '3 yrs', type: 'Rabbit', icon: <GiRabbit className="text-yellow-500 text-5xl mx-auto" /> },
  { id: 4, name: 'Oscar', age: '1 yr', type: 'Dog', icon: <FaDog className="text-yellow-500 text-5xl mx-auto" /> },
];

export default function Home() {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Navbar */}
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

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-16 bg-white">
        <img src="/Pet and Family.jpg" alt="Happy pet and adopter" className="w-full md:w-1/2 rounded-3xl shadow-lg" />
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Every Pet Deserves a Loving Home. <br />
            <span className="text-yellow-600">Adopt a Pet Today</span>
          </h2>
          <p className="text-lg text-gray-700">Browse available animals and learn about the process. Let’s <strong>rescue, rehabilitate</strong>, and <strong>rehome</strong> pets in need.</p>
          <a href="/auth/google" className="inline-block px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600">Get Started</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="p-8 md:p-16 bg-gray-50">
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
            <p className="text-gray-600">Simplified adoption process for families and shelters.</p>
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
      {/*How we Work Section*/}
      <section id="about" className="p-8 md:p-16 bg-gray-50">
        <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">How PawPal Works</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-gray-700">
          {[ 
            { step: "1. Sign Up", desc: "Create a free account using Google. Whether you're an adopter or a shelter, you’ll be onboarded in seconds." },
            { step: "2. Discover Pets", desc: "Use powerful filters to explore pets by type, breed, age, and city. See full profiles with health and shelter details." },
            { step: "3. Express Interest", desc: "Submit adoption requests in one click. Verified shelters will review your interest and get in touch with next steps." },
            { step: "4. Connect & Meet", desc: "Arrange meetings with the shelter through the contact form. Get to know your future companion better before adoption." },
            { step: "5. Verified Listings", desc: "All listings are created by verified shelter admins to ensure trust, safety, and transparency for all users." },
            { step: "6. Your Dashboard", desc: "Track your favorite pets, submitted requests, and updates easily through your own personal dashboard." }
          ].map((card, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">
              <h4 className="text-xl font-semibold mb-2 text-yellow-600">{card.step}</h4>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Optional Pet Preview */}
      <section className="p-8 md:p-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Featured Pets</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredPets.map(pet => (
            <div key={pet.id} className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition p-6 text-center">
              {pet.icon}
              <h4 className="text-xl font-semibold text-gray-800 mt-4">{pet.name}</h4>
              <p className="text-sm text-gray-500">{pet.age} • {pet.type}</p>
              <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600">Adopt Me</button>
            </div>
          ))}
        </div>
      </section>

      
      
      {/* Call to Action */}
      <section className="p-8 md:p-16 bg-yellow-500 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Adopt or Help a Pet?</h3>
        <p className="mb-6">Sign in with Google and start your journey.</p>
        <a href="/auth/google" className="px-6 py-3 bg-white text-yellow-600 rounded-full font-semibold hover:bg-gray-100 m-4">Sign in as adopter</a>
        <a href="/auth/google" className="px-6 py-3 bg-white text-yellow-600 rounded-full font-semibold hover:bg-gray-100 m-4">Sign in as shelter</a>
      </section>
      {/* Footer */}
      <footer className="bg-gray-100 text-center p-6 text-sm text-gray-500">
        <p>&copy; 2025 PawPal. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}
