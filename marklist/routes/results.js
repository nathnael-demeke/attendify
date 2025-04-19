// router.get('/results', async (req, res) => {
//     try {
//       let where = '';
//       if(req.session.rs_id) {
//         where = "WHERE r.student_id = ${req.session.rs_id};"
//       }
  
//       const [results] = await req.db.query( "SELECT r.*, CONCAT(s.firstname, ' ', s.middlename, ' ', s.lastname) as name, s.student_code, CONCAT(c.level, '-', c.section) as class FROM results r INNER JOIN classes c ON c.id = r.class_id INNER JOIN students s ON s.id = r.student_id ${where} ORDER BY UNIX_TIMESTAMP(r.date_created) DESC");
  
//       // Get subject counts
//       for(const result of results) {
//         const [subjectCount] = await req.db.query(
//           'SELECT COUNT(*) as count FROM result_items WHERE result_id = ?',
//           [result.id]
//         );
//         result.subjects = subjectCount[0].count;
//       }
  
//       res.render('results', {
//         results,
//         user: req.session.user
//       });
//     } catch (err) {
//       res.status(500).render('error', { message: err.message });
//     }
//   });

  router.get('/results', async (req, res) => {
    try {
      let where = '';
      if(req.session.rs_id) {
        where = "WHERE r.student_id = ${req.session.rs_id};"
      }
  
      const [results] = await req.db.query(
       " SELECT r.*, CONCAT(s.firstname, ' ', s.middlename, ' ', s.lastname) as name, s.student_code, CONCAT(c.level, '-', c.section) as class FROM results r INNER JOIN classes c ON c.id = r.class_id INNER JOIN students s ON s.id = r.student_id ${where} ORDER BY UNIX_TIMESTAMP(r.date_created) DESC "
      );
  
      // Get subject counts
      for(const result of results) {
        const [subjectCount] = await req.db.query(
          'SELECT COUNT(*) as count FROM result_items WHERE result_id = ?',
          [result.id]
        );
        result.subjects = subjectCount[0].count;
      }
  
      res.render('results', {
        results,
        user: req.session.user
      });
    } catch (err) {
      res.status(500).render('error', { message: err.message });
    }
  });

  router.get('/edit/:id', async (req, res) => {
    try {
      const [result] = await pool.query(" SELECT r.*, CONCAT(s.firstname, ' ', s.middlename, ' ', s.lastname) as name, s.student_code, CONCAT(c.level, '-', c.section) as class FROM results r INNER JOIN classes c ON c.id = r.class_id INNER JOIN students s ON s.id = r.student_id WHERE r.id = ? , [req.params.id]);");
      res.render('edit_result', { result: result[0] });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });