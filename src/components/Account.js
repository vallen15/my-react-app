// src/components/Account.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Account.css';

function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('loggedInUserEmail');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.email === email);

    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserEmail');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="account-container">
      <div className="account-info">
        <h2>Informasi Akun</h2>
        <p><strong>Nama:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Nomor Telepon:</strong> {user.phone}</p>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Account;
