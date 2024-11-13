// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import PaymentConfirmation from './components/PaymentConfirmation';
import TicketConfirmation from './components/TicketConfirmation';
import EditInfo from './components/EditInfo';
import Login from './components/Login';
import Register from './components/Register';
import UserHome from './components/UserHome';
import TicketBooking from './components/TicketBooking';
import History from './components/History';
import Help from './components/Help';
import Account from './components/Account';
import './css/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Layout untuk halaman Admin dengan sidebar */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="dashboard" element={<div>Beranda Admin</div>} />
          <Route path="payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="ticket-confirmation" element={<TicketConfirmation />} />
          <Route path="edit-info" element={<EditInfo />} />
        </Route>

        {/* Layout untuk halaman User dengan komponen UserHome sebagai sidebar */}
        <Route path="/user" element={<UserHome />}>
          <Route path="home" element={<div>Selamat Datang di Beranda Pengguna!</div>} />
          <Route path="ticket-booking" element={<TicketBooking />} />
          <Route path="history" element={<History />} />
          <Route path="help" element={<Help />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
