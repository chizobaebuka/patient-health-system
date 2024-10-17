import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import patientRoutes from './routes/patientRoutes';
import authorizationRoutes from './routes/authorizationRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/patients', patientRoutes);
app.use('/api/authorizations', authorizationRoutes);
app.use('/api/auth', authRoutes);

export default app;