import mongoose from "mongoose";
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

const updateBlog = async (req, res) => {
    const { id } = req.query;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id : ${id}`);
    }
    try {
        const doc = await Blog.findById(id);
        doc.title = title;
        doc.description = description;
        await doc.save();

        res.status(200).json({
            message : 'successfully updated'
        })
    } catch (error) {
        res.status(400).json({
            message : "Something went wrong on updating, Please try again"
        });
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.query;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id : ${id}`);
    }

    try {
        let doc = await Blog.findById(id);
        await doc.remove();

        res.status(200).json({
            message : 'removed successfully'
        });
    } catch (error) {
         res.status(400).json({
            message : "Something went wrong on removeing, Please try again"
        });
    }
}

export { getAllBlogs, createBlog, updateBlog, deleteBlog };
