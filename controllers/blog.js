import Blog from "../models/blog.js";

const getAllBlogs = async (req, res) => {}

const createBlog = async (req, res) => {
    const { id } = req.user;

    const newBlog = new Blog({
        ...req.body,
        user : id
    });

    try {
        await newBlog.save();

        res.status(201).json({
            message : 'Created successfully'
        });
    } catch (error) {
        res.status(409).json({
            message : 'Something went wrong!'
        });
    }
}

const updateBlog = async (req, res) => {}

const deleteBlog = async (req, res) => {}

export { getAllBlogs, createBlog, updateBlog, deleteBlog };
