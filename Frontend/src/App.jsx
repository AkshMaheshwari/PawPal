import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home.jsx';  // Changed to capital P
import About from './Pages/About.jsx';
import Donate from './Pages/Donate.jsx';
import Contact from './Pages/Contact.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Welcome from './Pages/Welcome.jsx';
import PetForm from './Components/PetForm.jsx';  // Changed to capital C
import ShelterDashboard from './Pages/ShelterDashboard.jsx';
import AdoptionRequest from './Pages/AdoptionRequest.jsx';

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