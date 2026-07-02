const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM movie');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM movie WHERE id_movie = ?', [req.params.id]);
    connection.release();
    res.json(rows[0] || { message: 'Movie tidak ditemukan' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO movie (judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga]
    );
    connection.release();
    res.status(201).json({ message: 'Movie berhasil ditambahkan' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE movie SET judul = ?, genre = ?, durasi = ?, tanggal = ?, jam_tayang = ?, studio = ?, kapasitas = ?, harga = ? WHERE id_movie = ?',
      [judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga, req.params.id]
    );
    connection.release();
    res.json({ message: 'Movie berhasil diupdate' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM movie WHERE id_movie = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Movie berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;