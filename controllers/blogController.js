const db = require('../models/db');


// Display all blogs on dashboard
const all_blogs = (req, res) => {
    const user_id = req.session.user_id;
    query=db.Blog.find({user_id:`${user_id}`});
    query.then(result => {
        db.log(`Displaying all blogs for ${user_id}`);
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
  
  // Individual blog
  const blog_details = (req, res) => {
    const user_id = req.session.user_id;
    const blog_id = req.params.blog_id;
    query=db.Blog.findOne({user_id:`${user_id}`, _id: blog_id});
    query.then(result => {
        db.log(`Displaying ${blog_id} blog`);
        res.render('details', { blog: result, title: 'Blog Details', linkedin: req.session.linkedin, github: req.session.github });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  // Create blog page 
  const create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog', linkedin: req.session.linkedin, github: req.session.github });
  }
  
  // Create blog through POST request
  const create_blog = (req, res) => {
    const user_id = req.session.user_id;
    values=req.body;
    const blog = new db.Blog({user_id:`${user_id}`,title:`${values.title}`,snippet:`${values.snippet}`,body:`${values.body}`});
    query=blog.save();
    query.then(result => {
        db.log(`New blog for ${user_id} created`);
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  // Delete blog
  const delete_blog = (req, res) => {
    const blog_id = req.params.blog_id;
    query=db.Blog.findByIdAndDelete(blog_id);
    query.then(result => {
        db.log(`Blog with id=${blog_id} deleted`);
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
