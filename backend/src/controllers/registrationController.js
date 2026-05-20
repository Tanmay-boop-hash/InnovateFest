const pool = require('../db/pool');

const registerUser = async (req, res) => {
  const { full_name, email, college, year_of_study, skills, motivation } = req.body;

  // Server-side validation
  if (!full_name || !email || !college || !year_of_study || !skills || !motivation) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({ error: 'At least one skill is required' });
  }

  if (motivation.length > 500) {
    return res.status(400).json({ error: 'Motivation must be under 500 characters' });
  }

  if (year_of_study < 1 || year_of_study > 6) {
    return res.status(400).json({ error: 'Year of study must be between 1 and 6' });
  }

  try {
    const query = `
      INSERT INTO registrations (full_name, email, college, year_of_study, skills, motivation)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [full_name, email.toLowerCase(), college, year_of_study, skills, motivation];
    const result = await pool.query(query, values);

    return res.status(201).json({
      message: 'Registration successful',
      registration: result.rows[0]
    });

  } catch (err) {
    // PostgreSQL unique violation error code
    if (err.code === '23505') {
      return res.status(409).json({ error: 'This email is already registered' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM registrations ORDER BY created_at DESC'
    );
    return res.json({
      total: result.rows.length,
      registrations: result.rows
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getRegistrationById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM registrations WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM registrations WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    return res.json({ message: 'Registration deleted', registration: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerUser, getAllRegistrations, getRegistrationById, deleteRegistration };