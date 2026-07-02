const Booking = require('../models/Booking');

class BookingController {
  // GET semua booking
  static async getAll(req, res) {
    try {
      const bookings = await Booking.getAll();
      res.status(200).json({
        success: true,
        data: bookings
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // GET booking by ID
  static async getById(req, res) {
    try {
      const booking = await Booking.getById(req.params.id);
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking tidak ditemukan'
        });
      }
      res.status(200).json({
        success: true,
        data: booking
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // CREATE booking baru
  static async create(req, res) {
    try {
      const { nik, id_movie, jumlah_tiket, total_harga, status_pembayaran } = req.body;

      if (!nik || !id_movie || !jumlah_tiket) {
        return res.status(400).json({
          success: false,
          message: 'NIK, ID Movie, dan Jumlah Tiket harus diisi'
        });
      }

      const booking = await Booking.create(nik, id_movie, jumlah_tiket, total_harga, status_pembayaran || 'pending');
      res.status(201).json({
        success: true,
        message: 'Booking berhasil dibuat',
        data: booking
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // UPDATE booking
  static async update(req, res) {
    try {
      const { status_pembayaran } = req.body;

      const existingBooking = await Booking.getById(req.params.id);
      if (!existingBooking) {
        return res.status(404).json({
          success: false,
          message: 'Booking tidak ditemukan'
        });
      }

      const booking = await Booking.update(req.params.id, status_pembayaran);
      res.status(200).json({
        success: true,
        message: 'Booking berhasil diupdate',
        data: booking
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // DELETE booking
  static async delete(req, res) {
    try {
      const existingBooking = await Booking.getById(req.params.id);
      if (!existingBooking) {
        return res.status(404).json({
          success: false,
          message: 'Booking tidak ditemukan'
        });
      }

      await Booking.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Booking berhasil dihapus'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = BookingController;