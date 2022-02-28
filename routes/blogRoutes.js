const express = require('express');
const blogController = require('../controllers/blogController');
const { redirectLogin} = require('../controllers/loginController');
const router = express.Router();

// Blog Routes
router.get('/create', redirectLogin, blogController.create_get);
router.get('/', redirectLogin, blogController.all_blogs);
router.post('/', redirectLogin, blogController.create_blog);
router.get('/:blog_id', redirectLogin, blogController.blog_details);
router.delete('/:blog_id', redirectLogin, blogController.delete_blog);

module.exports = router;