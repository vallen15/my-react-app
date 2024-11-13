// src/components/TicketConfirmation.js
import React, { useEffect, useState } from 'react';
import '../css/TicketConfirmation.css';

const TicketConfirmation = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Ambil data confirmedTickets dari localStorage
    const savedTickets = JSON.parse(localStorage.getItem('confirmedTickets')) || [];
    setTickets(savedTickets);
  }, []);

  const confirmTicket = (id) => {
    const today = new Date().toLocaleDateString();

    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id 
        ? { ...ticket, status: 'Verified', usageDate: today }
        : ticket
    );

    setTickets(updatedTickets);
    localStorage.setItem('confirmedTickets', JSON.stringify(updatedTickets));  // Simpan kembali ke localStorage
  };

  const deleteVerifiedTickets = () => {
    const unverifiedTickets = tickets.filter(ticket => ticket.status !== 'Verified');
    setTickets(unverifiedTickets);
    localStorage.setItem('confirmedTickets', JSON.stringify(unverifiedTickets));  // Simpan hasil filter
  };

  return (
    <div className="ticket-container">
      <h1>Konfirmasi Tiket</h1>
      <button onClick={deleteVerifiedTickets} className="delete-verified-btn">
        Hapus yang Telah Diverifikasi
      </button>
      <table className="ticket-table">
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
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.name}</td>
                <td>{ticket.email}</td>
                <td>{ticket.tickets}</td>
                <td>{ticket.status === 'Paid' ? 'Confirmed' : ticket.status || 'Belum Dibayar'}</td>
                <td>{ticket.timestamp || 'Tanggal Tidak Tersedia'}</td>
                <td>
                  <span 
                    className={`ticket-status ${ticket.status === 'Verified' ? 'verified' : ticket.status === 'Paid' ? 'paid' : 'not-verified'}`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td>{ticket.usageDate || 'Belum Digunakan'}</td>
                <td>
                  {ticket.status === 'Paid' && ticket.status !== 'Verified' ? (
                    <button onClick={() => confirmTicket(ticket.id)} className="verify-btn">
                      Verifikasi
                    </button>
                  ) : (
                    <span>{ticket.usageDate}</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center', color: '#999' }}>
                Tidak ada tiket yang perlu dikonfirmasi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketConfirmation;
