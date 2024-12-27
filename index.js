const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'equip9',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// POST: Register User
app.post('/users', async (req, res) => {
  const { first_name, last_name, mobile_number, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'CALL InsertUser(?, ?, ?, ?)',
    [first_name, last_name, mobile_number, hashedPassword],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).send('User Registered');
    }
  );
});

// GET: Retrieve User
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  db.query('CALL GetUserById(?)', [userId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results[0]);
  });
});

// PUT: Update User
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name } = req.body;

  db.query(
    'CALL UpdateUser(?, ?, ?)',
    [userId, first_name, last_name],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(200).send('User Updated');
    }
  );
});

// DELETE: Delete User
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  db.query('CALL DeleteUser(?)', [userId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('User Deleted');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
