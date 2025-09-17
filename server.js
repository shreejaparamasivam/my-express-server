const express = require('express');
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bodyParser = require('body-parser');

// Database setup
const adapter = new FileSync('db.json');
const db = low(adapter);

// Initialize the database with default data if empty
db.defaults({ users: [] }).write();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello! Express server is running on port 8000.');
});

// POST route to receive data
app.post('/test', (req, res) => {
  console.log(req.body.username, req.body.password);

  // Save user data to the database
  db.get('users')
    .push({ username: req.body.username, password: req.body.password })
    .write();

  res.send('User data received and stored!');
});

// GET route to retrieve users
app.get('/data', (req, res) => {
  res.json(db.get('users').value());
});

// Start server on port 8000
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
