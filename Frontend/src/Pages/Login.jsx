import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log("Backend login response:", data);

      if (!res.ok) {
        toast.error(data.message || 'Login failed');
        return;
      }

      localStorage.setItem("username", data.user.name);
      localStorage.setItem("token", data.token);
      toast.success('Login successful!');
      window.location.href = '/home';

    } catch (err) {
      console.error("Login request failed:", err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome to the Login Page
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label htmlFor="email" className="block text-left text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-left text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Login
          </button>

          {/* Don't have an account link */}
          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-yellow-500 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;