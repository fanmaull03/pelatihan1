const User = require('../models/User');

class UserController {
  // GET semua user
  static async getAll(req, res) {
    try {
      const users = await User.getAll();
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // GET user pake NIK
  static async getByNik(req, res) {
    try {
      const user = await User.getByNik(req.params.nik);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User tidak ditemukan'
        });
      }
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // CREATE user baru
  static async create(req, res) {
    try {
      const { nik, nama, email, nomor_hp, alamat } = req.body;

      if (!nik || !nama) {
        return res.status(400).json({
          success: false,
          message: 'NIK dan Nama harus diisi'
        });
      }

      const user = await User.create(nik, nama, email, nomor_hp, alamat);
      res.status(201).json({
        success: true,
        message: 'User berhasil dibuat',
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // UPDATE user
  static async update(req, res) {
    try {
      const { nama, email, nomor_hp, alamat } = req.body;

      const existingUser = await User.getByNik(req.params.nik);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User tidak ditemukan'
        });
      }

      const user = await User.update(req.params.nik, nama, email, nomor_hp, alamat);
      res.status(200).json({
        success: true,
        message: 'User berhasil diupdate',
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // DELETE user
  static async delete(req, res) {
    try {
      const existingUser = await User.getByNik(req.params.nik);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User tidak ditemukan'
        });
      }

      await User.delete(req.params.nik);
      res.status(200).json({
        success: true,
        message: 'User berhasil dihapus'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = UserController;