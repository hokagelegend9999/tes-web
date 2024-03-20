const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Koneksi database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL Anda
  password: '123456', // Ganti dengan password MySQL Anda
  database: 'vms_deden' // Ganti dengan nama database Anda
});

// Membuat koneksi database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Database connected');
});

// Route untuk pendaftaran
router.post('/', (req, res) => {
  const { username, email, password } = req.body;

  // Query untuk menyimpan data pengguna ke dalam database
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User registered:', result);
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

module.exports = router;
