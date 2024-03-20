import React from 'react';
import RegisterForm from './RegisterForm';
import { useNavigate } from 'react-router-dom'; // Import useNavigate dari react-router-dom

const RegisterPage = () => {
  const navigate = useNavigate(); // Membuat instance navigate

  // Handler untuk menangani pendaftaran
  const handleRegister = (formData) => {
    // Lakukan sesuatu dengan data pendaftaran jika diperlukan
    console.log('Data pendaftaran:', formData);
    // Arahkan pengguna ke halaman login setelah pendaftaran berhasil
    navigate('/login');
  };

  return (
    <div>
      <h1>Register Page</h1>
      {/* Melewatkan prop 'onRegister' ke RegisterForm */}
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
