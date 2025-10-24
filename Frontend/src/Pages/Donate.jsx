/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Home, Stethoscope, PawPrint, Menu, X } from "lucide-react";
import { FaPaw } from "react-icons/fa";
import axios from "axios";

const Donate = () => {
  const [amount, setAmount] = useState(500);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/donate/create-order`, {
        amount,
        currency: "INR",
        receipt: "receipt#1",
        notes: { donor_name: name, donor_email: email },
      });

      const order = data;

      const options = {
        key: "rzp_test_RTfVl6TT8ZEFbD",
        amount: order.amount,
        currency: order.currency,
        name: "PawPal Donations",
        description: "Thank you for supporting PawPal ❤️",
        image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
        order_id: order.id,
        handler: async function (response) {
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/donate/verify-payment`, verifyData);
          alert("🎉 Payment successful! Thank you for your donation.");
        },
        prefill: { name, email },
        theme: { color: "#FBBF24" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        alert("❌ Payment failed. Please try again.");
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-yellow-100/50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaPaw className="text-white text-lg" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              <a href="/">PawPal</a>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {["About", "Contact", "Donate"].map((item) => (
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

          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-yellow-100 transition"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-yellow-600" />
            ) : (
              <Menu className="w-6 h-6 text-yellow-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-yellow-100/50 shadow-lg">
            <nav className="flex flex-col items-center py-4 space-y-4 text-sm font-medium">
              {["About", "Contact", "Donate"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-yellow-600 transition-all duration-300"
                >
                  {item}
                </a>
              ))}
              <a
                href="/user/signup"
                onClick={() => setMenuOpen(false)}
                className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-2 rounded-full hover:from-yellow-600 hover:to-amber-600 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center pt-32 pb-16 px-4 sm:px-8 lg:px-16"
      >
        {/* Intro */}
        <div className="max-w-3xl text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-6 py-2 rounded-full mb-6 font-semibold text-sm"
          >
            <Heart className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            Make a Difference Today
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-6 leading-tight">
            Support PawPal
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
            Your kind donation provides food, shelter, and medical care for animals in need.
            Every contribution brings hope to a furry friend.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl w-full">
          {/* Impact Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white to-yellow-50/50 backdrop-blur-md shadow-xl rounded-3xl p-8 space-y-6 hover:shadow-2xl transition-all duration-500 border border-yellow-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl shadow-lg">
                <PawPrint className="text-white w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Your Impact
              </h2>
            </div>

            <div className="space-y-5 text-gray-700">
              {[
                { icon: <Home className="text-blue-500 w-5 h-5" />, text: "Safe shelter & daily care" },
                { icon: <Stethoscope className="text-green-500 w-5 h-5" />, text: "Medical treatment & vaccinations" },
                { icon: <Heart className="text-red-500 w-5 h-5" />, text: "Nutritious food & supplies" },
              ].map(({ icon, text }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-yellow-100/50"
                >
                  <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
                  <span className="font-semibold">{text}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl border border-yellow-200">
              <p className="text-sm text-gray-700 font-medium text-center">
                <span className="text-2xl font-bold text-yellow-600">1000+</span> animals helped this year
              </p>
            </div>
          </motion.div>

          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handlePayment}
              className="bg-gradient-to-br from-white to-amber-50/30 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 space-y-8 hover:shadow-3xl transition-all duration-500 border border-yellow-100"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    1
                  </span>
                  Choose Amount
                </h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  {[500, 1000, 2000, 5000].map((amt) => (
                    <motion.button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                        amount === amt
                          ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg border-2 border-yellow-400"
                          : "bg-white border-2 border-gray-200 text-gray-700 hover:border-yellow-400 hover:shadow-md"
                      }`}
                    >
                      ₹{amt}
                    </motion.button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Or enter custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none hover:border-yellow-300 transition-all duration-300 font-semibold text-gray-700 bg-white shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-md flex items-center justify-center text-white font-bold text-xs">
                      2
                    </span>
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none hover:border-yellow-300 transition-all duration-300 bg-white shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-md flex items-center justify-center text-white font-bold text-xs">
                      3
                    </span>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none hover:border-yellow-300 transition-all duration-300 bg-white shadow-sm"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <Heart className="w-5 h-5 fill-white" />
                Complete Donation
              </motion.button>

              <p className="text-center text-sm text-gray-500 mt-4">
                🔒 Secure payment powered by Razorpay
              </p>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Donate;
