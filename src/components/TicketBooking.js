// src/components/TicketBooking.js
import React, { useState, useEffect } from 'react';
import '../css/TicketBooking.css';

function TicketBooking() {
  const [showForm, setShowForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tickets: 1,
    visitDate: '',
    paymentMethod: ''
  });
  const [errors, setErrors] = useState({});
  const [museumInfo, setMuseumInfo] = useState({
    openingHours: '',
    ticketPrice: 50000,
    eventInfo: ''
  });

  useEffect(() => {
    const storedMuseumInfo = JSON.parse(localStorage.getItem('museumInfo'));
    if (storedMuseumInfo) {
      setMuseumInfo(storedMuseumInfo);
    }
  }, []);

  const handleOrderClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nama wajib diisi';
    if (!formData.email) newErrors.email = 'Email wajib diisi';
    if (!formData.visitDate) newErrors.visitDate = 'Tanggal kunjungan wajib diisi';
    if (!formData.tickets || formData.tickets < 1) newErrors.tickets = 'Jumlah tiket tidak valid';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentClick = () => {
    if (validateForm()) {
      setShowPayment(true);
      setShowForm(false);
    }
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Pilih metode pembayaran';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmPayment = () => {
    if (validatePayment()) {
      const existingHistory = JSON.parse(localStorage.getItem('history')) || [];
      const newBooking = {
        id: `TIK${Date.now()}`,
        ...formData,
        totalPayment: formData.tickets * museumInfo.ticketPrice,
        timestamp: new Date().toLocaleString(),
        status: 'Pending'
      };
      existingHistory.push(newBooking);
      localStorage.setItem('history', JSON.stringify(existingHistory));
      alert("Pemesanan tiket berhasil!");
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      tickets: 1,
      visitDate: '',
      paymentMethod: ''
    });
    setShowForm(false);
    setShowPayment(false);
    setErrors({});
  };

  return (
    <div className="ticket-booking">
      <div className={`museum-info ${showForm || showPayment ? 'blur' : ''}`}>
        <img src="/images/image9.jpg" alt="Museum" />
        <div className="info">
          <h2>Informasi Museum</h2>
          <p>Jam Buka: {museumInfo.openingHours}</p>
          <p>Harga Tiket: Dewasa Rp{museumInfo.ticketPrice}</p>
          <p>Event: {museumInfo.eventInfo}</p>
          <button onClick={handleOrderClick}>Pesan Tiket</button>
        </div>
      </div>

      {showForm && (
        <div className="overlay">
          <div className="order-form">
            <h3>Form Pemesanan</h3>
            <label>
              Nama:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </label>
            <label>
              Jumlah Tiket:
              <input
                type="number"
                name="tickets"
                min="1"
                value={formData.tickets}
                onChange={handleInputChange}
              />
              {errors.tickets && <p className="error">{errors.tickets}</p>}
            </label>
            <label>
              Tanggal Kunjungan:
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleInputChange}
              />
              {errors.visitDate && <p className="error">{errors.visitDate}</p>}
            </label>
            <button onClick={handlePaymentClick}>Lanjut ke Pembayaran</button>
            <button onClick={resetForm}>Batal</button>
          </div>
        </div>
      )}

      {showPayment && (
        <div className="overlay">
          <div className="payment-form">
            <h3>Detail Pembayaran</h3>
            <p>Jumlah Tiket: {formData.tickets}</p>
            <p>Total Harga: Rp{formData.tickets * museumInfo.ticketPrice}</p>
            <label>
              Metode Pembayaran:
              <select name="paymentMethod" onChange={handleInputChange}>
                <option value="">Pilih Metode</option>
                <option value="ShopeePay">ShopeePay</option>
                <option value="GoPay">GoPay</option>
                <option value="Dana">Dana</option>
                <option value="BCA">BCA</option>
                <option value="BRI">BRI</option>
              </select>
              {errors.paymentMethod && <p className="error">{errors.paymentMethod}</p>}
            </label>
            <button onClick={handleConfirmPayment}>Konfirmasi Pembayaran</button>
            <button onClick={resetForm}>Batal</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketBooking;
