import React from "react";
import { motion } from "framer-motion";
import { Heart, Home, Stethoscope } from "lucide-react";

const Donate = () => {
  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center py-10 px-4"
      >
        {/* Header */}
        <div className="max-w-3xl text-center mb-10">
          <h1 className="text-4xl font-bold text-yellow-600 mb-2">Support PawPal</h1>
          <p className="text-gray-600">
            Your generous donations help us provide food, shelter, and medical care
            to animals in need.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Impact Section */}
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Heart className="text-yellow-500" /> Your Impact
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <Home className="text-yellow-500" /> Shelter and care for rescued pets
              </div>
              <div className="flex items-center gap-3">
                <Stethoscope className="text-yellow-500" /> Medical treatment & vaccinations
              </div>
              <div className="flex items-center gap-3">
                <Heart className="text-yellow-500" /> Nutritious food and daily supplies
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div className="lg:col-span-2">
            <form className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
              {/* Preset Donation Options */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Choose Amount</h3>
                <div className="flex flex-wrap gap-3">
                  {[500, 1000, 2000, 5000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className="px-4 py-2 rounded-lg border border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 transition font-semibold"
                    >
                      ₹{amt}
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Custom Amount"
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition"
                  />
                </div>
              </div>

              {/* Donor Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition"
                  />
                </div>
              </div>

              {/* Payment Info Placeholder */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition">
                  <option>UPI</option>
                  <option>Credit/Debit Card</option>
                  <option>Net Banking</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
              >
                Donate Now
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Donate;
