/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, PawPrint } from "lucide-react";
import { FaPaw } from "react-icons/fa";
import { toast } from 'react-toastify';

const Contact = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!email || !name || !message || !subject) {
        toast.error('Please fill in all fields');
        return;
      }
  
      setIsLoading(true);
      try {
        const res = await fetch('http://localhost:3000/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, subject, message })
        });
  
        const data = await res.json();
        console.log("Backend login response:", data);
  
        if (!res.ok) {
          toast.error(data.error || 'failed to send your form!');
          return;
        }
        
        toast.success('Message sent successfully!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
  
      } catch (err) {
        console.error("Login request failed:", err);
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Navbar (same as About) */}
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

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {["About","Contact", "Donate"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-600 hover:text-yellow-600 transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
            <a
              href="/user/signup"
              className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-2.5 rounded-full hover:from-yellow-600 hover:to-amber-600 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
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
        className="flex flex-col items-center pt-32 pb-16 px-4"
      >
        {/* Header */}
        <div className="max-w-2xl text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-600 mb-4">
            Contact PawPal
          </h1>
          <p className="text-gray-600 text-lg">
            We’d love to hear from you about adoption, volunteering, or donations.  
            Fill out the form or reach us directly!
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-3 gap-10 max-w-6xl w-full">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <PawPrint className="text-yellow-500" /> Get in Touch
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="text-yellow-500" />
                <span className="font-medium">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="text-yellow-500" />
                <span className="font-medium">support@pawpal.org</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="text-yellow-500" />
                <span className="font-medium">Mumbai, India</span>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden shadow-md">
              <iframe
                title="PawPal Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609840718!2d72.74109840331454!3d19.082197839444438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aa8f43c6f%3A0xa73662f4240e8d6f!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689603051234!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-10 space-y-6 hover:shadow-2xl transition"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Write your message..."
                  required
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
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
};

export default Contact;
