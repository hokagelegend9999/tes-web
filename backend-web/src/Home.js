import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = 1; // Replace 1 with the actual user ID
    axios.get(`http://localhost:5000/users/${userId}`)
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Selamat datang, {user.username || 'Pengguna'}!</h2>
          <p>Ini adalah halaman profil Anda.</p>
          <p>Nama: {user.username || 'Tidak ada nama'}</p>
          <p>Email: {user.email || 'Tidak ada email'}</p>
          {/* Tambahkan informasi profil pengguna lainnya di sini sesuai kebutuhan */}
        </div>
      ) : (
        <p>Silakan login untuk mengakses halaman ini.</p>
      )}
    </div>
  );
};

export default Home;
