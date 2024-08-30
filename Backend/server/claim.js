const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smartscreen'
});

// Create Claim Endpoint
app.post('/claims', async (req, res) => {
  const { name, email, description, imageUrl } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO claims (name, email, description, imageUrl) VALUES (?, ?, ?, ?)',
      [name, email, description, imageUrl]
    );
    
    res.status(201).json({ id: result.insertId, name, email, description, imageUrl, created_at: new Date() });
  } catch (error) {
    console.error('Error inserting claim:', error);
    res.status(500).json({ error: 'An error occurred while creating the claim.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

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
