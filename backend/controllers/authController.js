const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.signup = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Error hashing password' });

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error("Database Error:", err); // Log the error to the console for debugging
        return res.status(500).json({ error: 'Database error', details: err.message }); // Send the error message in response
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    });
  });
};
