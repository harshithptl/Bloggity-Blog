const db = require('../models/db');

const blog_index = (req, res) => {
    query="SELECT * FROM BLOGS;"
    db.execute_query(query)
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  const blog_details = (req, res) => {
    const id = req.params.id;
    query=`SELECT * FROM BLOGS WHERE id=${id}`;
    db.execute_query(query)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  }
  
  const blog_create_post = (req, res) => {
    values=req.body;
    query=`INSERT INTO BLOGS (title,snippet,body) VALUES ("${values.title}","${values.snippet}","${values.body}");`
    db.execute_query(query)
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  const blog_delete = (req, res) => {
    const id = req.params.id;
    query=`DELETE FROM BLOGS WHERE id=${id}`;
    db.execute_query(query)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  module.exports = {
    blog_index, 
    blog_details, 
    blog_create_get, 
    blog_create_post, 
    blog_delete
  }
