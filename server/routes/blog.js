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

router.get('/getList', getBlogs);
router.post('/create', auth, createBlog);
router.get('/get/:id', getBlogById);
router.patch('/edit/:id', auth, editBlogById);
router.delete('/delete/:id', auth, deleteBlogById);

module.exports = router;
