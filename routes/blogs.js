import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from '../controllers/blog.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(verifyToken, getAllBlogs)
    .post(verifyToken, createBlog)
    .patch(verifyToken, updateBlog)
    .delete(verifyToken, deleteBlog)

export default router;