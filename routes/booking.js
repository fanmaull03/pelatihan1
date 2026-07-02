const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM booking');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM booking WHERE id_booking = ?', [req.params.id]);
    connection.release();
    res.json(rows[0] || { message: 'Booking tidak ditemukan' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { nik, id_movie, jumlah_tiket, total_harga, status_pembayaran } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO booking (nik, id_movie, jumlah_tiket, total_harga, status_pembayaran) VALUES (?, ?, ?, ?, ?)',
      [nik, id_movie, jumlah_tiket, total_harga, status_pembayaran]
    );
    connection.release();
    res.status(201).json({ message: 'Booking berhasil ditambahkan' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { status_pembayaran } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE booking SET status_pembayaran = ? WHERE id_booking = ?',
      [status_pembayaran, req.params.id]
    );
    connection.release();
    res.json({ message: 'Booking berhasil diupdate' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM booking WHERE id_booking = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Booking berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;