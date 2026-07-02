const pool = require('./config/database');

async function testConnection() {
  try {
    console.log('🔍 Mengecek koneksi database...');
    
    const connection = await pool.getConnection();
    console.log('Koneksi berhasil!');
  } catch (error) {
    console.error('Koneksi gagal:', error.message);
  } finally {
    pool.end();
  }
}

testConnection();