const pool = require('../config/database');

class User {
  // Get semua user
  static async getAll() {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM user');
    connection.release();
    return rows;
  }

  // Get user by NIK
  static async getByNik(nik) {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM user WHERE nik = ?', [nik]);
    connection.release();
    return rows[0];
  }

  // Create user baru
  static async create(nik, nama, email, nomor_hp, alamat) {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO user (nik, nama, email, nomor_hp, alamat) VALUES (?, ?, ?, ?, ?)',
      [nik, nama, email, nomor_hp, alamat]
    );
    connection.release();
    return { nik, nama, email, nomor_hp, alamat };
  }

  // Update user
  static async update(nik, nama, email, nomor_hp, alamat) {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE user SET nama = ?, email = ?, nomor_hp = ?, alamat = ? WHERE nik = ?',
      [nama, email, nomor_hp, alamat, nik]
    );
    connection.release();
    return { nik, nama, email, nomor_hp, alamat };
  }

  // Delete user
  static async delete(nik) {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM user WHERE nik = ?', [nik]);
    connection.release();
    return { message: 'User berhasil dihapus' };
  }
}

module.exports = User;