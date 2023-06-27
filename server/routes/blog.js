const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {
    createBlog,
    getBlogs,
    getBlogById,
    editBlogById,
    deleteBlogById,
} = require('../controllers/blog');

router.get('/', getBlogs);
router.post('/', auth, createBlog);
router.get('/:id', getBlogById);
router.patch('/:id', auth, editBlogById);
router.delete('/:id', auth, deleteBlogById);

module.exports = router;
