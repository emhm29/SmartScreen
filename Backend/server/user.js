// user.js

const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smartscreen'
});
const getClaims = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM claims');
    return rows;
  } catch (error) {
    console.error('Error executing query', error);  // Add error logging
    throw error;
  }
};

const createUser = async (email, password, role) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const [result] = await pool.query(
    'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
    [email, hashedPassword, role]
  );
  return { id: result.insertId, email, role };
};

const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};

const updateUser = async (id, newEmail, newPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  await pool.query(
    'UPDATE users SET email = ?, password = ? WHERE id = ?',
    [newEmail, hashedPassword, id]
  );
  return { id, email: newEmail };
};

const deleteUser = async (id) => {
  await pool.query(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  return { id };
};

module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser,
  getClaims,
};
