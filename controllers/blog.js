import Blog from "../models/blog.js";

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json({
            blogs
        })
    } catch (error) {
        res.status(500).json({
            message : 'Something went wrong!'
        })
    }
}

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
