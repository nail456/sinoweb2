// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Initialize express app
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to SQLite database
const db = new sqlite3.Database('./db/db_sinoweb.db', sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
});

// Create users table
// db.run(`
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     email TEXT NOT NULL UNIQUE,
//     password TEXT NOT NULL
//   );
// `);

// API Route for Register
app.post('/register', (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    // Hash password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            // Insert user data into the database
            db.run(`INSERT INTO UserInfo (email, password, firstname, lastname) VALUES (?, ?, ?, ?)`, [email, hash, firstname, lastname], (err) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    res.status(201).json({
                        message: 'User created successfully'
                    });
                }
            });
        }
    });
});

// API Route for Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Retrieve user data from the database
    db.get(`SELECT * FROM UserInfo WHERE email = ?`, [email], (err, user) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        } else {
            // Compare password
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else if (!result) {
                    return res.status(401).json({
                        message: 'Incorrect password'
                    });
                } else {
                    return res.status(200).json({
                        message: 'Login successful',
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            });
        }
    });
});
