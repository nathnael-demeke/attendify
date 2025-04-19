import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [classes] = await pool.query(" SELECT * FROM classes ORDER BY level ASC, section ASC");
    res.render('classes', { classes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add other class-related routes here

export default router;