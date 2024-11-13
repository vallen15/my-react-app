// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../css/AdminDashboard.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrasi chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const [history, setHistory] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Penjualan Tiket Harian',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4,
      },
    ],
  });

  const location = useLocation();

  useEffect(() => {
    // Ambil riwayat tiket yang sudah dikonfirmasi
    const confirmedTickets = JSON.parse(localStorage.getItem('confirmedTickets')) || [];
    setHistory(confirmedTickets);

    // Ambil harga tiket dari localStorage (data dari EditInfo.js)
    const storedMuseumInfo = JSON.parse(localStorage.getItem('museumInfo')) || {};
    setTicketPrice(storedMuseumInfo.ticketPrice || 0);

    // Hitung total penghasilan
    const total = confirmedTickets.reduce((sum, ticket) => sum + ticket.tickets * storedMuseumInfo.ticketPrice, 0);
    setTotalIncome(total);

    // Buat data untuk grafik berdasarkan riwayat pembelian tiket
    const dailySales = confirmedTickets.reduce((acc, ticket) => {
      const date = new Date(ticket.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + ticket.tickets;
      return acc;
    }, {});

    const labels = Object.keys(dailySales);
    const data = Object.values(dailySales);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Penjualan Tiket Harian',
          data: data,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          tension: 0.4,
        },
      ],
    });
  }, [ticketPrice]);

  const deleteHistory = (id) => {
    const updatedHistory = history.filter(ticket => ticket.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('confirmedTickets', JSON.stringify(updatedHistory));
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin/dashboard">Beranda</Link>
            </li>
            <li>
              <Link to="/admin/payment-confirmation">Konfirmasi Pembayaran</Link>
            </li>
            <li>
              <Link to="/admin/ticket-confirmation">Konfirmasi Tiket</Link>
            </li>
            <li>
              <Link to="/admin/edit-info">Edit Info museum</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        {location.pathname === '/admin/dashboard' && (
          <>
            <div className="header-dashboard">
              <h1>Dashboard Admin</h1>
              <div className="total-income">
                <h3>Total Penghasilan: Rp {totalIncome.toLocaleString()}</h3>
              </div>
            </div>
            <div className="chart-container">
              <h3>Grafik Penjualan Tiket</h3>
              <Line data={chartData} options={{ responsive: true }} />
            </div>
            <div className="history-table-container">
              <h3>Riwayat Pembelian Tiket</h3>
              <table className="purchase-history-table">
                <thead>
                  <tr>
                    <th>ID Tiket</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Jumlah Tiket</th>
                    <th>Status Pembayaran</th>
                    <th>Tanggal Pemesanan</th>
                    <th>Status Tiket</th>
                    <th>Tanggal Penggunaan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length > 0 ? (
                    history.map((ticket) => (
                      <tr key={ticket.id}>
                        <td>{ticket.id}</td>
                        <td>{ticket.name}</td>
                        <td>{ticket.email}</td>
                        <td>{ticket.tickets}</td>
                        <td>{ticket.status === 'Paid' ? 'Dikonfirmasi' : ticket.status}</td>
                        <td>{ticket.timestamp}</td>
                        <td>{ticket.status === 'Verified' ? 'Diverifikasi' : 'Belum Diverifikasi'}</td>
                        <td>{ticket.usageDate || 'Belum Digunakan'}</td>
                        <td>
                          <button onClick={() => deleteHistory(ticket.id)} className="delete-btn">
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center', color: '#999' }}>
                        Tidak ada riwayat pembelian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
        <Outlet /> {/* Menampilkan konten dari rute anak */}
      </main>
    </div>
  );
}

export default AdminDashboard;
