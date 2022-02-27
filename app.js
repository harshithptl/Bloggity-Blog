const express = require('express');
var session = require('express-session');

const blogRoutes = require('./routes/blogRoutes');
const loginRoutes = require('./routes/loginRoutes');
//Express app
const app = express();

// Register View Engine
app.set('view engine', 'ejs');
app.listen(3000);

// Middleware and Static Files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const age = 1000*60*60*2;
app.use(session({
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  secret:'secret',
  cookie : {
    maxAge: age,
    sameSite: true,
    secure: false,
  }
}));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Blog Routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Login Routes
app.get('/login',(req,res) => {
  res.render('login',{title: 'Login'});
});

// Blog Routes
app.use('/blogs', blogRoutes);
app.use(loginRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});