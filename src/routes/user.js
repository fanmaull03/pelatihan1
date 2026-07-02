const express = require('express');
const router = express.Router();
const pool = require('../../config/database');

// GET semua user
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM user');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user by NIK
router.get('/:nik', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM user WHERE nik = ?', [req.params.nik]);
    connection.release();
    res.json(rows[0] || { message: 'User tidak ditemukan' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST tambah user baru
router.post('/', async (req, res) => {
  const { nik, nama, email, nomor_hp, alamat } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO user (nik, nama, email, nomor_hp, alamat) VALUES (?, ?, ?, ?, ?)',
      [nik, nama, email, nomor_hp, alamat]
    );
    connection.release();
    res.status(201).json({ message: 'User berhasil ditambahkan' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE user
router.put('/:nik', async (req, res) => {
  const { nama, email, nomor_hp, alamat } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE user SET nama = ?, email = ?, nomor_hp = ?, alamat = ? WHERE nik = ?',
      [nama, email, nomor_hp, alamat, req.params.nik]
    );
    connection.release();
    res.json({ message: 'User berhasil diupdate' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE user
router.delete('/:nik', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM user WHERE nik = ?', [req.params.nik]);
    connection.release();
    res.json({ message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;