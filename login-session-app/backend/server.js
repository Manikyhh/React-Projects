// server.js
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Dummy user for demo
const USER = {
  username: 'admin',
  password: 'password123'
};

app.use(cors({
  origin: 'http://localhost:3000', // React frontend
  credentials: true,
}));
app.use(bodyParser.json());

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set true only with https
}));

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    req.session.user = username;
    res.send({ success: true, message: 'Logged in!' });
  } else {
    res.status(401).send({ success: false, message: 'Invalid credentials' });
  }
});

// Check session
app.get('/session', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
