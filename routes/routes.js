const express = require('express');
const blogController = require('../controllers/controller');

const router = express.Router();

router.get('/create', blogController.create_get);
router.get('/', blogController.all_blogs);
router.post('/', blogController.create_blog);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.delete_blog);

module.exports = router;