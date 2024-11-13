// src/components/UserHome.js
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../css/UserHome.css';

function UserHome() {
  const location = useLocation();

  return (
    <div className="user-home">
      {/* Navbar */}
      <header className="navbar">
        <h1>Museum Virtual</h1>
        <nav>
          <ul>
            <li className={location.pathname === "/user/home" ? "active" : ""}>
              <Link to="/user/home">Beranda</Link>
            </li>
            <li className={location.pathname === "/user/ticket-booking" ? "active" : ""}>
              <Link to="/user/ticket-booking">Pesan Tiket</Link>
            </li>
            <li className={location.pathname === "/user/history" ? "active" : ""}>
              <Link to="/user/history">Riwayat</Link>
            </li>
            <li className={location.pathname === "/user/help" ? "active" : ""}>
              <Link to="/user/help">Help/Bantuan</Link>
            </li>
            <li className={location.pathname === "/user/account" ? "active" : ""}>
              <Link to="/user/account">Akun</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Konten Utama */}
      <main className="content">
        {location.pathname === "/user/home" ? (
          <div className="home-content">
            <h2>Selamat Datang di Museum Virtual</h2>
            
            {/* Galeri Gambar Museum */}
            <div className="gallery">
              <h3>Gambar Museum</h3>
              <div className="image-grid">
                <img src="/images/image10.jpg" alt="Museum Interior" />
                <img src="/images/image4.jpg" alt="Museum Exterior" />
                <img src="/images/image3.jpg" alt="Exhibit" />
                <img src="/images/image6.jpg" alt="Visitors" />
              </div>
            </div>

            {/* Aturan dan Larangan di Museum */}
            <div className="rules">
              <h3>Aturan dan Larangan di Museum</h3>
              <ul>
                <li>Dilarang merokok di area museum.</li>
                <li>Dilarang membawa makanan dan minuman ke dalam museum.</li>
                <li>Dilarang menyentuh benda-benda pameran tanpa izin.</li>
                <li>Dilarang menggunakan flash saat mengambil foto.</li>
                <li>Jaga kebersihan dan buang sampah pada tempatnya.</li>
              </ul>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default UserHome;
