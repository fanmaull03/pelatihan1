const pool = require('../config/database');

class Movie {
  // Get semua movie
  static async getAll() {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM movie');
    connection.release();
    return rows;
  }

  // Get movie by ID
  static async getById(id) {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM movie WHERE id_movie = ?', [id]);
    connection.release();
    return rows[0];
  }

  // Create movie baru
  static async create(judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga) {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO movie (judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga]
    );
    connection.release();
    return { id_movie: result.insertId, judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga };
  }

  // Update movie
  static async update(id, judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga) {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE movie SET judul = ?, genre = ?, durasi = ?, tanggal = ?, jam_tayang = ?, studio = ?, kapasitas = ?, harga = ? WHERE id_movie = ?',
      [judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga, id]
    );
    connection.release();
    return { id_movie: id, judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga };
  }

  // Delete movie
  static async delete(id) {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM movie WHERE id_movie = ?', [id]);
    connection.release();
    return { message: 'Movie berhasil dihapus' };
  }
}

module.exports = Movie;