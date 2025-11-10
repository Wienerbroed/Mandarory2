import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

//Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors setup
app.use(cors());

// api routes
app.use('/api/auth', authRoutes);

// static files
app.use(express.static(path.join(__dirname, '../frontend/public')));

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});