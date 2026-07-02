const Movie = require('../models/Movie');

class MovieController {
  // GET semua movie
  static async getAll(req, res) {
    try {
      const movies = await Movie.getAll();
      res.status(200).json({
        success: true,
        data: movies
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // GET movie by ID
  static async getById(req, res) {
    try {
      const movie = await Movie.getById(req.params.id);
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: 'Movie tidak ditemukan'
        });
      }
      res.status(200).json({
        success: true,
        data: movie
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // CREATE movie baru
  static async create(req, res) {
    try {
      const { judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga } = req.body;

      if (!judul || !tanggal || !jam_tayang) {
        return res.status(400).json({
          success: false,
          message: 'Judul, Tanggal, dan Jam Tayang harus diisi'
        });
      }

      const movie = await Movie.create(judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga);
      res.status(201).json({
        success: true,
        message: 'Movie berhasil dibuat',
        data: movie
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // UPDATE movie
  static async update(req, res) {
    try {
      const { judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga } = req.body;

      const existingMovie = await Movie.getById(req.params.id);
      if (!existingMovie) {
        return res.status(404).json({
          success: false,
          message: 'Movie tidak ditemukan'
        });
      }

      const movie = await Movie.update(req.params.id, judul, genre, durasi, tanggal, jam_tayang, studio, kapasitas, harga);
      res.status(200).json({
        success: true,
        message: 'Movie berhasil diupdate',
        data: movie
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // DELETE movie
  static async delete(req, res) {
    try {
      const existingMovie = await Movie.getById(req.params.id);
      if (!existingMovie) {
        return res.status(404).json({
          success: false,
          message: 'Movie tidak ditemukan'
        });
      }

      await Movie.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Movie berhasil dihapus'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = MovieController;