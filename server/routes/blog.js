const express = require('express');
const router = express.Router();

const {
    createBlog,
    get20Blogs,
    getBlogById,
    editBlogById,
    deleteBlogById,
} = require('../controllers/blog.js');

router.get('/getList', get20Blogs);
router.post('/create', createBlog);
router.get('/get/:id', getBlogById);
router.patch('/edit/:id', editBlogById);
router.delete('/delete/:id/:authorId', deleteBlogById);

module.exports = router;
