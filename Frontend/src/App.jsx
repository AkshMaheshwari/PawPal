import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home'; // or your refactored landing page
import About from './pages/About'; // or your refactored about page
import Donate from './pages/Donate'; // or your refactored donate page
import Contact from './pages/Contact'; // or your refactored contact page

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
