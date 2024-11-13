// src/components/History.js
import React, { useEffect, useState } from 'react';
import '../css/History.css';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Mengambil email pengguna yang sedang login
    const email = localStorage.getItem('loggedInUserEmail');

    // Mengambil riwayat pembayaran berdasarkan email pengguna yang login
    const allHistory = JSON.parse(localStorage.getItem('history')) || [];
    const userHistory = allHistory.filter(item => item.email === email); // Filter berdasarkan email pengguna

    // Mengambil data pembayaran dan tiket yang sudah dikonfirmasi
    const confirmedPayments = JSON.parse(localStorage.getItem('history')) || [];
    const confirmedTickets = JSON.parse(localStorage.getItem('confirmedTickets')) || [];

    // Menambahkan status pembayaran dan status penggunaan ke dalam riwayat
    const enrichedHistory = userHistory.map((item) => {
      // Mencari status pembayaran berdasarkan ID tiket
      const payment = confirmedPayments.find(payment => payment.id === item.id);
      const ticket = confirmedTickets.find(ticket => ticket.id === item.id);

      // Menghitung batas penggunaan (3 hari setelah tanggal pemesanan)
      const orderDate = new Date(item.timestamp); // Mengubah string tanggal menjadi Date object
      const usageLimit = new Date(orderDate);
      usageLimit.setDate(orderDate.getDate() + 3); // Menambahkan 3 hari

      return {
        ...item,
        tickets: payment ? payment.tickets : 0, // Jumlah tiket dari data pembayaran
        paymentStatus: payment ? payment.status : 'Pending', // Status pembayaran
        usageStatus: ticket ? ticket.status : 'Belum Digunakan', // Status penggunaan
        usageLimit: usageLimit.toLocaleDateString() // Menghitung dan mengubah batas penggunaan menjadi format tanggal lokal
      };
    });

    setHistory(enrichedHistory);
  }, []);

  // Fungsi untuk menghapus riwayat
  const handleDeleteHistory = (id) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);

    // Menghapus dari localStorage
    const allHistory = JSON.parse(localStorage.getItem('history')) || [];
    const updatedAllHistory = allHistory.filter(item => item.id !== id);
    localStorage.setItem('history', JSON.stringify(updatedAllHistory));
  };

  return (
    <div className="history-container">
      <h1>Riwayat Pembayaran</h1>
      <table className="history-table">
        <thead>
          <tr>
            <th>ID Tiket</th>
            <th>Nama</th>
            <th>Total Pembayaran</th>
            <th>Tanggal</th>
            <th>Jumlah Tiket</th>
            <th>Status Pembayaran</th>
            <th>Status Penggunaan</th>
            <th>Batas Penggunaan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>Rp{item.totalPayment}</td>
                <td>{item.timestamp}</td>
                <td>{item.tickets}</td>
                <td>{item.paymentStatus === 'Confirmed' ? 'Dikonfirmasi' : 'Belum Dikonfirmasi'}</td>
                <td>{item.usageStatus}</td>
                <td>{item.usageLimit}</td>
                <td>
                  <button onClick={() => handleDeleteHistory(item.id)} className="delete-btn">
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center', color: '#999' }}>
                Tidak ada riwayat pembayaran.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
