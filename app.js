const express = require('express');
var session = require('express-session');
const blogRoutes = require('./routes/blogRoutes');
const loginRoutes = require('./routes/loginRoutes');
const mongoose=require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

//Express app
const app = express();

//Register View Engine
app.set('view engine', 'ejs');

const mongo_db_username = process.env.MONGO_DB_USERNAME
const mongo_db_password = process.env.MONGO_DB_PASSWORD
//Connect to mongodb and listen for requests
const dbURI = "mongodb+srv://" + mongo_db_username + ":" + mongo_db_password + "@blogs.ph2hv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const port = process.env.PORT || 3000
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(port, '0.0.0.0'))   // Listen for requests on 3000 port if connection is successful
  .catch(err => console.log(err));

// Middleware and Static Files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Session configuration
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

// Dashboard
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// About Page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Blog Routes
app.use('/blogs', blogRoutes);
// Login Routes
app.use(loginRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});