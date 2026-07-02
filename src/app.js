const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');
const bookingRoutes = require('./routes/booking');

// Use Routes
app.use('/api/user', userRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/booking', bookingRoutes);

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'API Bioskop Running!' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});