import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk melakukan redirect
import './LoginForm.css'; // Import file CSS untuk styling

const LoginForm = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.message === 'Login berhasil') {
        // Jika login berhasil, tampilkan alert
        alert('Login berhasil');
        // Redirect ke halaman home
        navigate('/home');
      } else {
        alert('Login gagal. Email atau password salah.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
      </div>
      <button type="submit">Login</button>
      <div className="register-link">
        Belum punya akun? <a href="/register">Daftar disini</a>
      </div>
    </form>
  );
};

export default LoginForm;
