// src/components/EditInfo.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/EditInfo.css';

function EditInfo() {
  const [users, setUsers] = useState([]);
  const [museumInfo, setMuseumInfo] = useState({
    openingHours: '08:00 - 18:00',
    ticketPrice: 50000,
    eventInfo: 'Event khusus bulan ini - Diskon 10%'
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data pengguna dari localStorage
    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(usersData);

    // Ambil informasi museum dari localStorage
    const storedMuseumInfo = JSON.parse(localStorage.getItem('museumInfo'));
    if (storedMuseumInfo) {
      setMuseumInfo(storedMuseumInfo);
    }
  }, []);

  const handleDelete = (email) => {
    if (email === 'admin@example.com') {
      alert('Akun admin tidak dapat dihapus.');
      return;
    }
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('Akun berhasil dihapus.');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserEmail');
    navigate('/');
  };

  const handleMuseumInfoChange = (e) => {
    const { name, value } = e.target;
    setMuseumInfo({ ...museumInfo, [name]: value });
  };

  const saveMuseumInfo = () => {
    localStorage.setItem('museumInfo', JSON.stringify(museumInfo));
    alert('Informasi museum berhasil diperbarui.');
  };

  return (
    <div className="edit-info-container">
      <h2>Daftar Akun</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Nomor Telepon</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {user.email !== 'admin@example.com' && (
                  <button onClick={() => handleDelete(user.email)}>Hapus</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Edit Informasi Museum</h2>
      <div className="museum-info-edit">
        <label>
          Jam Buka:
          <input
            type="text"
            name="openingHours"
            value={museumInfo.openingHours}
            onChange={handleMuseumInfoChange}
          />
        </label>
        <label>
          Harga Tiket (Rp):
          <input
            type="number"
            name="ticketPrice"
            value={museumInfo.ticketPrice}
            onChange={handleMuseumInfoChange}
          />
        </label>
        <label>
          Informasi Event:
          <input
            type="text"
            name="eventInfo"
            value={museumInfo.eventInfo}
            onChange={handleMuseumInfoChange}
          />
        </label>
        <button onClick={saveMuseumInfo}>Simpan Informasi</button>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default EditInfo;
