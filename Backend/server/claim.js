const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smartscreen'
});

const createClaim = async (name, email, description, imageUrl) => {
    const [result] = await pool.query(
      'INSERT INTO claims (name, email, description, imageUrl) VALUES (?, ?, ?, ?)',
      [name, email, description, imageUrl]
    );
    return { id: result.insertId, name, email, description, imageUrl, created_at: new Date() };
  };

const findClaimById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM claims WHERE id = ?',
    [id]
  );
  return rows[0];
};

module.exports = {
  createClaim,
  findClaimById,
};
