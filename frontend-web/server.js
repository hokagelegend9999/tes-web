const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); 
const uuid = require('uuid'); // Import UUID package

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'vms_deden'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Database connected');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.length > 0) {
        res.status(200).json({ message: 'Login berhasil', user: result[0] });
      } else {
        res.status(401).json({ message: 'Email atau password salah' });
      }
    }
  });
});

const router = express.Router();

router.post('/', (req, res) => {
  const { username, email, password } = req.body;

  // Generate UUID
  const userId = uuid.v4();

  const sql = 'INSERT INTO users (userId, username, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [userId, username, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User registered:', result);
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.length > 0) {
        res.status(200).json({ user: result[0] });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    }
  });
});

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.use('/register', router);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
