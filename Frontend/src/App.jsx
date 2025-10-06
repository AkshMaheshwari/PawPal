import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import About from './pages/About';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import PetForm from './Components/PetForm';
import ShelterDashboard from './pages/ShelterDashboard';
import AdoptionRequest from './pages/AdoptionRequest';

export default function App() {
  return (
    <Router>
      {/* Toast container is global for all pages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/home" element={<Welcome />} />
        <Route path="/shelter/add" element={<PetForm />} />
        <Route path="/shelter/dashboard" element={<ShelterDashboard />} />
        <Route path="/user/adopt/:petId/request" element={<AdoptionRequest />} />
      </Routes>
    </Router>
  );
}
