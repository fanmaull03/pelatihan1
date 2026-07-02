const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');
const bookingRoutes = require('./bookingRoutes');

router.use('/user', userRoutes);
router.use('/movie', movieRoutes);
router.use('/booking', bookingRoutes);

module.exports = router;