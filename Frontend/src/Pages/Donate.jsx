/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Home, Stethoscope, PawPrint } from "lucide-react";
import { FaPaw } from "react-icons/fa";
import axios from "axios";

const Donate = () => {
  const [amount, setAmount] = useState(500);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      // 1️⃣ Create order on backend
      const { data } = await axios.post("http://localhost:3000/api/donate/create-order", {
        amount,
        currency: "INR",
        receipt: "receipt#1",
        notes: { donor_name: name, donor_email: email },
      });

      const order = data;

      // 2️⃣ Configure Razorpay checkout options
      const options = {
        key: "rzp_test_RTfVl6TT8ZEFbD", // replace with your actual Razorpay Key ID
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

          // 3️⃣ Verify payment
          await axios.post("http://localhost:3000/api/donate/verify-payment", verifyData);
          alert("🎉 Payment successful! Thank you for your donation.");
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#FBBF24",
        },
      };

      // 4️⃣ Open Razorpay Checkout
      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        alert("❌ Payment failed. Please try again.", response.error);
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Navbar (same as your original) */}
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
        </div>
      </header>

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center pt-32 pb-16 px-4"
      >
        <div className="max-w-2xl text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-600 mb-4">
            Support PawPal
          </h1>
          <p className="text-gray-600 text-lg">
            Your kind donation provides food, shelter, and medical care for animals in need.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 max-w-6xl w-full">
          {/* Impact Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <PawPrint className="text-yellow-500" /> Your Impact
            </h2>

            <div className="space-y-4 text-gray-700 font-medium">
              <div className="flex items-center gap-3">
                <Home className="text-yellow-500" /> Safe shelter & daily care
              </div>
              <div className="flex items-center gap-3">
                <Stethoscope className="text-yellow-500" /> Medical treatment & vaccinations
              </div>
              <div className="flex items-center gap-3">
                <Heart className="text-yellow-500" /> Nutritious food & supplies
              </div>
            </div>
          </motion.div>

          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handlePayment}
              className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-10 space-y-6 hover:shadow-2xl transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Choose Amount</h3>
                <div className="flex flex-wrap gap-3">
                  {[500, 1000, 2000, 5000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt)}
                      className={`px-4 py-2 rounded-lg border ${
                        amount === amt
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-300"
                      } hover:border-yellow-500 transition font-semibold`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Custom Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Donate Now
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Donate;
