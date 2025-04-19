// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Support247 from './components/Support247';
import Homepage from './components/Homepage';
import PaymentPage from './components/PaymentPage';
import FindDoctor from './components/FindDoctor';
import AppointmentForm from './components/AppointmentForm';
import HealthReminders from './components/HealthReminders';
import OrderHistory from './components/OrderHistory';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/support247" element={<Support247 />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/appointment" element={<AppointmentForm />} />
        <Route path="/health-reminders" element={<HealthReminders />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
    </div>
  );
}

export default App;
