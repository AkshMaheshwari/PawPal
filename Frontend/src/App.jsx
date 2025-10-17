import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Donate from './pages/Donate.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Welcome from './pages/Welcome.jsx';
import PetForm from './components/PetForm.jsx';  // Changed 'Components' to 'components'
import ShelterDashboard from './pages/ShelterDashboard.jsx';
import AdoptionRequest from './pages/AdoptionRequest.jsx';

export default function App() {
  return (
    <Router>
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