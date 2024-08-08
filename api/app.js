const express = require('express');
const mysql = require('mysql2'); // Use mysql2 package
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bapun@7381',
  database: 'event_management'
});

db.connect((err) => {
  if (err) {
    console.error('error connecting to the database:', err);
    return;
  }
  console.log('MySQL connected...');
});

// API Endpoints

// Register User
app.post('/api/register', (req, res) => {
  const user = req.body;
  const sql = 'INSERT INTO users (event_name, first_name, last_name, dob, email, phone_number, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [user.event_name, user.first_name, user.last_name, user.dob, user.email, user.phone_number, user.address];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('error inserting user:', err);
      return res.status(500).send(err);
    }
    res.status(201).send('User registered');
  });
});

// Get Users for an Event
app.get('/api/events/:eventName/users', (req, res) => {
  const eventName = req.params.eventName;
  const sql = 'SELECT * FROM users WHERE event_name = ?';

  db.query(sql, [eventName], (err, results) => {
    if (err) {
      console.error('error fetching users:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
