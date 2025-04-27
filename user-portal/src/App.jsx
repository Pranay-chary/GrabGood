import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import HallBooking from './pages/HallBooking';
import RestaurantBooking from './pages/RestaurantBooking';
import HotelBooking from './pages/HotelBooking';
import SweetShopBooking from './pages/SweetShopBooking';
import Donations from './pages/Donations';
import Community from './pages/Community';
import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/halls" element={<HallBooking />} />
            <Route path="/restaurants" element={<RestaurantBooking />} />
            <Route path="/hotels" element={<HotelBooking />} />
            <Route path="/sweet-shops" element={<SweetShopBooking />} />
            <Route path="/donate" element={<Donations />} />
            <Route path="/community" element={<Community />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
