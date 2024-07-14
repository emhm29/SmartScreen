const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smartscreen'
});

const createUser = async (email, password,role = 'user') => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Password:', password); // Log the hashed password
  const [result] = await pool.query(
    'INSERT INTO users (email, password,role) VALUES (?, ?, ?)',
    [email, hashedPassword]
  );
  return { id: result.insertId, email,role };
};

const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};
