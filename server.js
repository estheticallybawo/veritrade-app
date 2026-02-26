const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB, sequelize } = require('./config/db');

// Import models
const User = require('./models/User');
const Supplier = require('./models/Supplier');
const VerificationRequest = require('./models/VerificationRequest');

// Import routes
const authRoutes = require('./routes/authRoutes');
console.log('authRoutes:', typeof authRoutes);

const verificationRoutes = require('./routes/verificationRoutes');
console.log('verificationRoutes:', typeof verificationRoutes);

const adminRoutes = require('./routes/adminRoutes');
console.log('adminRoutes:', typeof adminRoutes);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/verifications', verificationRoutes);
app.use('/api/admin', adminRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'VeriTrade API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => {
    console.log(`✅ VeriTrade server running on port ${PORT}`);
  });
};

startServer();

// close
