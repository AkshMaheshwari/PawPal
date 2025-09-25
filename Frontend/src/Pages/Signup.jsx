import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaPaw, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaCheckCircle, FaArrowLeft, FaGoogle, FaShieldAlt, FaHeart } from 'react-icons/fa';
import { MdPets, MdVerified } from 'react-icons/md';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/Auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || 'Signup failed');
        return;
      }

      toast.success('Signup successful! Welcome to PawPal!');
      window.location.href = '/user/login';
    } catch (err) {
      toast.error('Something went wrong', err);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: <MdVerified className="text-green-500" />, text: "Access to verified pet listings" },
    { icon: <FaShieldAlt className="text-blue-500" />, text: "Secure and private platform" },
    { icon: <MdPets className="text-yellow-500" />, text: "Direct communication with shelters" },
    { icon: <FaCheckCircle className="text-green-500" />, text: "Track your adoption journey" },
    { icon: <FaPaw className="text-pink-500" />, text: "Join a community of pet lovers" },
    { icon: <FaHeart className="text-red-500" />, text: "Make a difference in pets' lives" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200 mb-6"
          >
            <FaArrowLeft className="text-sm" />
            Back to Home
          </Link>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full mb-6 shadow-xl">
            <FaPaw className="text-white text-3xl" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Join the PawPal Family</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create your account and start your journey to finding the perfect companion
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Signup Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
              <p className="text-gray-600">Join thousands of happy pet parents</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Password must be at least 6 characters long</p>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 focus:ring-2"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium underline">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-semibold py-4 rounded-2xl hover:from-yellow-600 hover:to-amber-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <FaPaw className="text-lg" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            {/* Social Signup */}
            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-200 group">
              <FaGoogle className="text-red-500 text-xl" />
              <span className="text-gray-700 font-medium group-hover:text-gray-900">Continue with Google</span>
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-8">
              Already have an account?{' '}
              <Link to="/user/login" className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline transition-colors duration-200">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Benefits and Info Section */}
          <div className="space-y-6">
            {/* Benefits Cards */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Why Join <span className="text-yellow-600">PawPal?</span>
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <div className="text-xl">{benefit.icon}</div>
                    <span className="text-gray-700 font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-3xl p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h4 className="text-xl font-bold mb-2">100% Secure & Private</h4>
              <p className="text-yellow-100 text-sm">
                Your personal information is protected with bank-level security. We never share your data with third parties.
              </p>
            </div>

            {/* Success Stories Preview */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Success Stories</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FaPaw className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Sarah & Max</p>
                    <p className="text-sm text-gray-600">Found their perfect companion in just 2 weeks!</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaHeart className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">The Patel Family</p>
                    <p className="text-sm text-gray-600">Adopted Luna and couldn't be happier!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-yellow-600 hover:underline font-medium">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-yellow-600 hover:underline font-medium">Privacy Policy</a>
            . We're committed to protecting your privacy and providing a safe platform for pet adoption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;