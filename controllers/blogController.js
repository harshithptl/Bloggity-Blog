const db = require('../models/db');

const all_blogs = (req, res) => {
    const user_id = req.session.user_id;
    query=`SELECT * FROM BLOGS WHERE user_id=${user_id};`
    db.execute_query(query)
      .then(result => {
        if (req.session.flag==0){
          req.session.flag=1;
          res.render('index', { blogs: result, title: 'All blogs', linkedin: req.session.linkedin, github: req.session.github, name: req.session.name, flag: 0});
        }else{
          res.render('index', { blogs: result, title: 'All blogs', linkedin: req.session.linkedin, github: req.session.github, name: req.session.name, flag: 1});
        }
        
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  const blog_details = (req, res) => {
    const user_id = req.session.user_id;
    const blog_id = req.params.blog_id;
    query=`SELECT * FROM BLOGS WHERE user_id=${user_id} AND id=${blog_id}`;
    db.execute_query(query)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details', linkedin: req.session.linkedin, github: req.session.github });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  const create_get = (req, res) => {
    
    res.render('create', { title: 'Create a new blog', linkedin: req.session.linkedin, github: req.session.github });
  }
  
  const create_blog = (req, res) => {
    const user_id = req.session.user_id;
    values=req.body;
    query=`INSERT INTO BLOGS (title,snippet,body,user_id) VALUES ("${values.title}","${values.snippet}","${values.body}",${user_id});`
    db.execute_query(query)
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  const delete_blog = (req, res) => {
    const user_id = req.session.user_id;
    const blog_id = req.params.blog_id;
    query=`DELETE FROM BLOGS WHERE user_id=${user_id} AND id=${blog_id};`;
    db.execute_query(query)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  module.exports = {
    all_blogs, 
    blog_details, 
    create_get, 
    create_blog, 
    delete_blog
  }
