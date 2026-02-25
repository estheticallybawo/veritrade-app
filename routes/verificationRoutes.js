const express = require('express');
const router = express.Router();
const { 
  submitVerification, 
  getMyVerifications, 
  getVerificationById, 
  cancelVerification 
} = require('../controllers/verificationController');
const { authenticate, requireRole } = require('../middleware/authMiddleware');

// All verification routes require authentication and BUYER role
router.use(authenticate); // Apply to all routes below
router.use(requireRole('buyer')); // Only buyers can access

// POST /api/verifications/submit - Submit new verification request
router.post('/submit', submitVerification);

// GET /api/verifications/my-requests - Get all my verification requests
router.get('/my-requests', getMyVerifications);

// GET /api/verifications/:id - Get single verification request
router.get('/:id', getVerificationById);

// PATCH /api/verifications/:id/cancel - Cancel verification request
router.patch('/:id/cancel', cancelVerification);

module.exports = router;