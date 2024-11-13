// src/components/PaymentConfirmation.js
import React, { useEffect, useState } from 'react';
import '../css/PaymentConfirmation.css';

const PaymentConfirmation = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const savedPayments = JSON.parse(localStorage.getItem('history')) || [];
    setPayments(savedPayments);
  }, []);

  const confirmPayment = (id) => {
    const updatedPayments = payments.map((payment) =>
      payment.id === id ? { ...payment, status: 'Confirmed' } : payment
    );

    setPayments(updatedPayments);
    localStorage.setItem('history', JSON.stringify(updatedPayments));

    // Update confirmedTickets di localStorage
    const confirmedPayment = updatedPayments.find(payment => payment.id === id);
    const confirmedTickets = JSON.parse(localStorage.getItem('confirmedTickets')) || [];
    confirmedTickets.push({ ...confirmedPayment, status: 'Paid' });
    
    localStorage.setItem('confirmedTickets', JSON.stringify(confirmedTickets));
  };

  const deleteConfirmedPayments = () => {
    const unconfirmedPayments = payments.filter(payment => payment.status !== 'Confirmed');
    setPayments(unconfirmedPayments);
    localStorage.setItem('history', JSON.stringify(unconfirmedPayments));
  };

  return (
    <div className="payment-container">
      <h1>Konfirmasi Pembayaran</h1>
      <button onClick={deleteConfirmedPayments} className="delete-confirmed-btn">
        Hapus yang Telah Dikonfirmasi
      </button>
      <table className="payment-table">
        <thead>
          <tr>
            <th>ID Tiket</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Jumlah Tiket</th>
            <th>Total Pembayaran</th>
            <th>Metode Pembayaran</th>
            <th>Tanggal Pemesanan</th>
            <th>Status</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.name}</td>
                <td>{payment.email}</td>
                <td>{payment.tickets}</td>
                <td>Rp{payment.totalPayment}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.timestamp}</td>
                <td>{payment.status || 'Pending'}</td>
                <td>
                  {payment.status !== 'Confirmed' && (
                    <button onClick={() => confirmPayment(payment.id)} className="confirm-btn">
                      Konfirmasi
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center', color: '#999' }}>
                Tidak ada pembayaran yang perlu dikonfirmasi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentConfirmation;
