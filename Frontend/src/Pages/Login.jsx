import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaPaw, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowLeft, FaGoogle, FaShieldAlt, FaHeart, FaUserFriends } from 'react-icons/fa';
import { MdPets, MdVerified, MdSecurity } from 'react-icons/md';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log("Backend login response:", data);

      if (!res.ok) {
        toast.error(data.error || 'Login failed');
        return;
      }

      localStorage.setItem("username", data.user.name);
      localStorage.setItem("token", data.token);
      toast.success('Login successful! Welcome back!');
      window.location.href = '/welcome';

    } catch (err) {
      console.error("Login request failed:", err);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: <MdVerified className="text-green-500" />, text: "Verified shelters only", color: "bg-green-50" },
    { icon: <FaShieldAlt className="text-blue-500" />, text: "Secure platform", color: "bg-blue-50" },
    { icon: <FaHeart className="text-pink-500" />, text: "Easy adoption process", color: "bg-pink-50" },
    { icon: <FaUserFriends className="text-purple-500" />, text: "24/7 support", color: "bg-purple-50" }
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
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sign in to your PawPal account and continue your pet adoption journey
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In to Your Account</h2>
              <p className="text-gray-600">Access your personalized dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter your password"
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
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 focus:ring-2" 
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-yellow-600 hover:text-yellow-700 font-medium hover:underline transition-colors duration-200">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-semibold py-4 rounded-2xl hover:from-yellow-600 hover:to-amber-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <FaPaw className="text-lg" />
                    Sign In
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

            {/* Social Login */}
            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-200 group">
              <FaGoogle className="text-red-500 text-xl" />
              <span className="text-gray-700 font-medium group-hover:text-gray-900">Continue with Google</span>
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 mt-8">
              Don't have an account?{' '}
              <Link to="/signup" className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline transition-colors duration-200">
                Create one here
              </Link>
            </p>
          </div>

          {/* Features and Info Section */}
          <div className="space-y-6">
            {/* Features Grid */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Why Choose <span className="text-yellow-600">PawPal?</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className={`${feature.color} p-4 rounded-2xl text-center hover:scale-105 transition-transform duration-200`}>
                    <div className="text-2xl mb-2 flex justify-center">{feature.icon}</div>
                    <p className="text-sm font-medium text-gray-700">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdSecurity className="text-white text-2xl" />
              </div>
              <h4 className="text-xl font-bold mb-2">Bank-Level Security</h4>
              <p className="text-green-100 text-sm">
                Your account is protected with enterprise-grade security measures and encryption.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Platform Stats</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl">
                  <span className="text-gray-700 font-medium">Active Users</span>
                  <span className="text-2xl font-bold text-yellow-600">10,000+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                  <span className="text-gray-700 font-medium">Successful Adoptions</span>
                  <span className="text-2xl font-bold text-green-600">5,000+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                  <span className="text-gray-700 font-medium">Partner Shelters</span>
                  <span className="text-2xl font-bold text-blue-600">200+</span>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-3xl p-8 text-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-white text-2xl" />
                </div>
                <blockquote className="text-lg italic mb-4">
                  "PawPal made finding our perfect companion so easy. The platform is secure, user-friendly, and truly cares about animal welfare."
                </blockquote>
                <p className="font-semibold">- The Sharma Family</p>
                <p className="text-yellow-100 text-sm">Happy PawPal Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            By signing in, you agree to our{' '}
            <a href="#" className="text-yellow-600 hover:underline font-medium">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-yellow-600 hover:underline font-medium">Privacy Policy</a>
            . Your privacy and security are our top priorities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;