const mysql = require('mysql');

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bapun@7381',
    database: 'event_management'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Register a user for an event
const registerUser = (req, res) => {
    const { event_name, first_name, last_name, dob, email, phone_number, address } = req.body;
    const sql = 'INSERT INTO users (event_name, first_name, last_name, dob, email, phone_number, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [event_name, first_name, last_name, dob, email, phone_number, address], (err, result) => {
        if (err) throw err;
        res.send('User registered');
    });
};

// Get users by event
const getUsersByEvent = (req, res) => {
    const { eventName } = req.params;
    const sql = 'SELECT * FROM users WHERE event_name = ?';
    db.query(sql, [eventName], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

module.exports = {
    registerUser,
    getUsersByEvent
};
