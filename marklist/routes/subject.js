const router = require('express').Router();

router.get('/subjects', async (req, res) => {
  try {
    const [subjects] = await req.db.query( " SELECT * FROM subjects ORDER BY UNIX_TIMESTAMP(date_created) DESC ");
    
    res.render('subjects', {
      subjects,
      user: req.session.user
    });
  } catch (err) {
    res.status(500).render('error', { message: err.message });
  }
});

module.exports = router;