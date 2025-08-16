import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, PawPrint } from "lucide-react";

const Contact = () => {
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
          <h1 className="text-4xl font-bold text-yellow-600 mb-2">Contact PawPal</h1>
          <p className="text-gray-600">
            We’d love to hear from you about adoption, volunteering, or donations.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Contact Info */}
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <PawPrint className="text-yellow-500" /> Get in Touch
            </h2>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="text-yellow-500" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="text-yellow-500" />
              <span>support@pawpal.org</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="text-yellow-500" />
              <span>Mumbai, India</span>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-lg overflow-hidden shadow-sm">
              <iframe
                title="PawPal Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609840718!2d72.74109840331454!3d19.082197839444438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aa8f43c6f%3A0xa73662f4240e8d6f!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689603051234!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
