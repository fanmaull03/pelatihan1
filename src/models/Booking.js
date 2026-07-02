const pool = require('../config/database');

class Booking {
  // Get semua booking
  static async getAll() {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM booking');
    connection.release();
    return rows;
  }

  // Get booking by ID
  static async getById(id) {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM booking WHERE id_booking = ?', [id]);
    connection.release();
    return rows[0];
  }

  // Create booking baru
  static async create(nik, id_movie, jumlah_tiket, total_harga, status_pembayaran) {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO booking (nik, id_movie, jumlah_tiket, total_harga, status_pembayaran) VALUES (?, ?, ?, ?, ?)',
      [nik, id_movie, jumlah_tiket, total_harga, status_pembayaran]
    );
    connection.release();
    return { id_booking: result.insertId, nik, id_movie, jumlah_tiket, total_harga, status_pembayaran };
  }

  // Update booking
  static async update(id, status_pembayaran) {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE booking SET status_pembayaran = ? WHERE id_booking = ?',
      [status_pembayaran, id]
    );
    connection.release();
    return { id_booking: id, status_pembayaran };
  }

  // Delete booking
  static async delete(id) {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM booking WHERE id_booking = ?', [id]);
    connection.release();
    return { message: 'Booking berhasil dihapus' };
  }
}

module.exports = Booking;