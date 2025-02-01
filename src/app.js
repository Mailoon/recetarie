import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './config/dataBase.js';
import authRoutes from './api/routes/auth.routes.js';
import userRoutes from './api/routes/user.routes.js';
import categoryRoutes from './api/routes/category.routes.js';
import publicationsRoutes from './api/routes/publications.routes.js';


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/publications', publicationsRoutes);  


// Connect to database
connectDB();

export default app;