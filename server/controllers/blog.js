const BlogModel = require('../models/blogModel');

exports.createBlog = async (req, res) => {
    const {
        title,
        summary,
        content,
        cover,
        authorId,
        authorName,
        authorUsername,
    } = req.body;
    try {
        const result = await BlogModel.create({
            title,
            summary,
            content,
            cover,
            authorId,
            authorName,
            authorUsername,
        });
        res.status(201).json({
            success: true,
            result,
            message: 'Blog created',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};

exports.get20Blogs = async (req, res) => {
    try {
        const result = await BlogModel.find().sort({ createdAt: -1 }).limit(20);
        res.status(200).json({
            success: true,
            result,
            message: '20 blogs fetched',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};

exports.getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await BlogModel.findById(id);
        res.status(200).json({
            success: true,
            result,
            message: 'Fetched a Blog by id',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'No blog found',
            error: error.message,
        });
        console.log(error);
    }
};

exports.editBlogById = async (req, res) => {
    const { id } = req.params;
    const { title, summary, content, cover, authorId } = req.body;
    const update = {
        title,
        summary,
        content,
        cover,
    };
    try {
        const blog = await BlogModel.findById(id);
        if (blog.authorId !== authorId) {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to update this blog',
            });
        }
        await blog.updateOne(update);
        res.status(200).json({
            success: true,
            blog,
            message: 'Blog updated',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};

exports.deleteBlogById = async (req, res) => {
    const { id, authorId } = req.params;
    try {
        const blog = await BlogModel.findById(id);
        if (blog.authorId !== authorId) {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to delete this blog',
            });
        }
        await BlogModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Blog deleted',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};
