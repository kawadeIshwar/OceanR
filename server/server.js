import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './config/database.js';

// Load environment variables
config();

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import quoteRoutes from './routes/quotes.js';
import adminRoutes from './routes/admin.js';

// Initialize express app
const app = express();

// Connect to database
connectDB();

/* ===============================
   CORS CONFIG (PRODUCTION READY)
================================ */

const allowedOrigins = [
  'https://oceanrenterprises.com',
  'https://www.oceanrenterprises.com',
  'https://api.oceanrenterprises.com',
  'https://oceanr.netlify.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-side requests (curl, PM2, cron)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error('Blocked by CORS:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

/* ===============================
   BODY PARSERS (413 FIX)
================================ */

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

/* ===============================
   ROUTES
================================ */

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/admin', adminRoutes);

/* ===============================
   HEALTH CHECK
================================ */

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'OceanR API is running',
    environment: process.env.NODE_ENV || 'development'
  });
});

/* ===============================
   GLOBAL ERROR HANDLER
================================ */

app.use((err, req, res, next) => {
  console.error('🔥 API Error:', {
    message: err.message,
    url: req.originalUrl,
    method: req.method,
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong'
  });
});

/* ===============================
   START SERVER
================================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
