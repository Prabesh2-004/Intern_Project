import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js'
import connectCloudinary from './config/cloudinary.js';

dotenv.config();

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174'
]

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'auth-token']
}))

app.use('/api/auth', authRouter)
app.use('/api/product', productRouter)


const PORT = process.env.PORT || 5000;

connectDB();
connectCloudinary();

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})