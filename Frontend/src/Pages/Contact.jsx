/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, PawPrint, Send } from "lucide-react"; // Added Send icon
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
            // NOTE: Switched to axios for consistency with the Donate component, but kept fetch logic for now.
            // If you use axios, the logic below needs a slight adjustment, but for a simple fetch, it's fine.
            const res = await fetch('http://localhost:3000/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, subject, message })
            });

            const data = await res.json();
            console.log("Backend login response:", data);

            if (!res.ok) {
                toast.error(data.error || 'Failed to send your form!');
                return;
            }

            toast.success('Message sent successfully! We will get back to you shortly.');
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');

        } catch (err) {
            console.error("Contact request failed:", err);
            toast.error('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
            {/* Navbar (Kept identical to Donate Page) */}
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
                {/* Header (Styling matched to Donate page header) */}
                <div className="max-w-3xl text-center mb-16">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-6 py-2 rounded-full mb-6 font-semibold text-sm"
                    >
                        <Mail className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        We're Here for You
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-6 leading-tight">
                        Contact PawPal
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                        Reach out to us for adoption inquiries, volunteering opportunities, partnerships, or any other questions you may have.
                    </p>
                </div>

                {/* Layout Grid */}
                <div className="grid lg:grid-cols-3 gap-10 max-w-6xl w-full">

                    {/* Contact Form (Styling matched to Donate form) */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }} // Reversed animation from Donate form for variety
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-2"
                    >
                        <form
                            onSubmit={handleSubmit}
                            // Background and shadow styles copied from Donate form
                            className="bg-gradient-to-br from-white to-amber-50/30 backdrop-blur-md shadow-2xl rounded-3xl p-10 space-y-8 hover:shadow-3xl transition-all duration-500 border border-yellow-100"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">1</span>
                                Send Us a Message
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Input field styling matched to Donate input fields */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-bold text-gray-800 mb-2" // Matched label styling
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your Name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        // Input styling matched to Donate input fields
                                        className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none hover:border-yellow-300 transition-all duration-300 bg-white shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-bold text-gray-800 mb-2" // Matched label styling
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        // Input styling matched to Donate input fields
                                        className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none hover:border-yellow-300 transition-all duration-300 bg-white shadow-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2"
                                >
                                    <span className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-md flex items-center justify-center text-white font-bold text-xs">2</span>
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    placeholder="How can we help?"
                                    required
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    // Input styling matched to Donate input fields
                                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none hover:border-yellow-300 transition-all duration-300 bg-white shadow-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2"
                                >
                                    <span className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-md flex items-center justify-center text-white font-bold text-xs">3</span>
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    placeholder="Write your message..."
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    // Input styling matched to Donate input fields
                                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none hover:border-yellow-300 transition-all duration-300 bg-white shadow-sm"
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isLoading}
                                // Button styling matched to Donate button
                                className="w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5 fill-white" />
                                {isLoading ? 'Sending...' : 'Send Message'}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Info (Styling matched to Donate Impact Section) */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }} // Reversed animation from Donate impact section for variety
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        // Background and shadow styles copied from Donate impact section
                        className="bg-gradient-to-br from-white to-yellow-50/50 backdrop-blur-md shadow-xl rounded-3xl p-8 space-y-6 hover:shadow-2xl transition-all duration-500 border border-yellow-100 h-fit" // Added h-fit to prevent it from stretching
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl shadow-lg">
                                <PawPrint className="text-white w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Our Details
                            </h2>
                        </div>

                        <div className="space-y-5 text-gray-700">
                            {/* Inner cards matched to Donate inner cards */}
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-yellow-100/50"
                            >
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Phone className="text-yellow-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-normal text-gray-500">Call Us</p>
                                    <span className="font-semibold text-gray-800">+91 98765 43210</span>
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-yellow-100/50"
                            >
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Mail className="text-yellow-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-normal text-gray-500">Email Us</p>
                                    <span className="font-semibold text-gray-800">support@pawpal.org</span>
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-yellow-100/50"
                            >
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <MapPin className="text-yellow-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-normal text-gray-500">Our Location</p>
                                    <span className="font-semibold text-gray-800">Mumbai, India</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Google Maps (Styled to match the aesthetic) */}
                        <div className="mt-8 rounded-xl overflow-hidden shadow-lg border-2 border-yellow-100">
                            <iframe
                                title="PawPal Location"
                                // Note: Removed 'http://googleusercontent.com/' part, as it may cause issues, but kept the base URL.
                                // You may need a proper embed URL here for it to work correctly in a real app.
                                src="https://maps.google.com/maps?q=Mumbai,India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="220"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
            
            {/* Footer (Kept identical) */}
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
                        <p className="text-gray-400">© 2025 PawPal. All rights reserved. Made with ❤️ for animals in need.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Contact;