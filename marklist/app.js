const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const pool = require('./db_connect');
const app = express();
const upload = multer({ dest: 'uploads/' });

const exphbs = require('express-handlebars');

const bodyParser = require('body-parser'); 
  // Handlebars setup
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    layoutsDir: "C:\\Users\\Hp\\Desktop\\Projects\\attendify\\marklist\\views\\layouts",
    helpers: {
      ucwords: (str) => str ? str.replace(/\b\w/g, c => c.toUpperCase()) : '',
      json: context => JSON.stringify(context),
      eq: (a, b) => a === b,
      isset: (val) => val !== undefined,
      substr: (str, start, length) => str?.substr(start, length) || '',
      unless: function(conditional, options) { return !conditional ? options.fn(this) : options.inverse(this); },
      firstLetter: function(str) {
        if (str && str.length > 0) {
          return str.charAt(0).toUpperCase();
        }
        return '';
      },
      capitalize: function(str) { 
        if (str && str.length > 0) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return '';
      },
      or: function(a, b) {  
        return a || b;
      }
    },
    partialsDir  : [
        //  path to your partials
        path.join(__dirname, 'views/partials'),
    ]
  }));


app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
  // Middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
  }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'your_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/home', async (req, res) => {
  try {
      if (req.session.login_type === 1) {
          const [students] = await pool.query('SELECT COUNT(*) AS count FROM students');
          const [classes] = await pool.query('SELECT COUNT(*) AS count FROM classes');
          
          res.render('home', {
              login_type: 1,
              students: students[0].count,
              classes: classes[0].count,
              subjects: 3,
          });
      } else {
          res.render('home', {
              login_type: 0,
              name: req.session.login_name
          });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});
// Routes
app.get('/view_user/:id', async (req, res) => {
    try {
        const [rows] = await pool.query( "SELECT *, CONCAT(grand_father_name, ', ', first_name, ' ', father_name) AS name FROM students WHERE id = ?", [req.params.id] );
        res.render('new_user', { 
            user: rows[0],
            type_arr: ['', 'Admin', 'User']
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
    res.render('view_user')
});
app.get('/results/new', async (req, res) => {
  //This should be fixed
  const [students] = await pool.query(" SELECT students.*, CONCAT(classes.grade,'-',classes.section) from students join classes on classes.student_id = students.id");
  
  // const [subjects] = await pool.query('SELECT * FROM subjects');
  res.render('new_result', { students });
});



app.post('/save_student', async (req, res) => {
  try {
    const { student_code, firstname, lastname } = req.body;
    const [existing] = await pool.query(
      'SELECT id FROM students WHERE student_code = ?', 
      [student_code]
    );
    
    if(existing.length > 0) {
      return res.json({ success: false, message: 'Student code exists' });
    }
    
    await pool.query(
      'INSERT INTO students SET ?',
      { student_code, firstname, lastname }
    );
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});


app.use(async (req, res, next) => {
    if(!req.session.system) {
      const [system] = await pool.query('SELECT * FROM system_settings');
      req.session.system = system[0];
    }
    next();
  });
  
  app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });

// Add similar routes for other pages (view_result, user_list, etc.)

// Start server


app.use(async (req, res, next) => {
  if(!req.session.system) {
    const [settings] = await pool.query('SELECT * FROM system_settings');
    req.session.system = settings[0];
  }
  next();
});

// Authentication middleware
const auth = (req, res, next) => {
  if(!req.session.login_id) return res.redirect('/login');
  next();
};

// Routes
app.get('/login', async (req, res) => {
  if(req.session.login_id) return res.redirect('/');
  res.render('login', { system: req.session.system });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [users] = await pool.query(
    'SELECT * FROM sub_admins WHERE username = ?', 
    [username]
  );
  
  if(users.length > 0 && password == users[0].password) {
    req.session.login_id = users[0].id;
    req.session.login_type = users[0].type;
    res.redirect('/');
  } else {
    res.render('login', { error: 'Invalid credentials', system: req.session.system });
  }
});

app.get('/', auth, async (req, res) => {
  const page = req.query.page || 'home';
  try {
    res.render('index', {
      title: page.replace(/_/g, ' '),
      system: req.session.system,
      login_type: req.session.login_type,
      new_user: "<p> hello world </p>",
    });
  } catch {
    res.status(404).render('404');
  }
});

app.get('/users/new', async (req, res) => {
  const [user] = await pool.query('SELECT * FROM sub_admins WHERE id = ?', [req.query.id]);
  res.render('new_user', { ...user[0], login_type: req.session.login_type });
});

app.post('/save_user', upload.single('img'), async (req, res) => {
  // Handle user save logic
});
app.listen(3000, () => console.log('Server running on port 3000'));