const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const routes = require('./routes');

// Use Routes
app.use('/api', routes);

// Test Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Bioskop Running!',
    version: '1.0.0'
  });
});

module.exports = app;