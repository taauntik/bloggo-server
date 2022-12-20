import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import blogRoutes from './routes/blogs.js';

dotenv.config();
const PORT = 5000 || process.env.PORT;
const dbURL = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/blogsDB';
const app = express();

app.use(bodyParser.json());
app.use(cors())

// Welcome route
app.get('/', (req, res) => {
    res.send("<h1 style=\"font-family: sans-serif\">Blogs API is running 🚀</h1>");
})

// Routing setup
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);

// database connection
mongoose.set('strictQuery', false);
mongoose
    .connect(dbURL)
    .then(() => {
        app.listen(PORT, () => console.log(`Listening to port http://localhost:${PORT}`));
    })
    .catch(err => console.log(err.message));