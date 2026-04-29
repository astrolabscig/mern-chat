import 'dotenv/config'; // MUST be first - loads .env before any process.env access
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';
import connectToDB from './db/dbConnect.js';
import { app, server } from './socket/socket.js';

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS: read allowed origins from env var (comma-separated list)
// Set CORS_ORIGIN in .env for dev, and in hosting dashboard for production
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error('CORS blocked for origin: ' + origin));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  // Express 5: use regex instead of the deprecated string wildcard '/(.*)'
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

server.listen(PORT, async () => {
  await connectToDB();
  console.log('Server running on port ' + PORT);
});
