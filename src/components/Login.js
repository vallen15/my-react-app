// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);

  const images = [
    'url(/images/image1.jpg)',
    'url(/images/image2.jpg)',
    'url(/images/image11.jpg)',
    'url(/images/image8.jpg)'
  ];

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const adminExists = users.some(user => user.email === 'admin@example.com');

    if (!adminExists) {
      users.push({ name: 'Admin', email: 'admin@example.com', phone: '', password: 'admin123', role: 'admin' });
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUserEmail', email);

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/home');
      }
    } else {
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: images[backgroundImageIndex] }}>
      <div className="form-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
          <p>
            Belum punya akun? <Link to="/register">Daftar di sini</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
