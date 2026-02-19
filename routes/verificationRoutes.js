const express = require('express');
const router = express.Router();
const { 
  submitVerification, 
  getMyVerifications, 
  getVerificationById, 
  cancelVerification 
} = require('../controllers/verificationController');

// POST /api/verifications/submit - Submit new verification request
router.post('/submit', submitVerification);

// GET /api/verifications/my-requests - Get all my verification requests
router.get('/my-requests', getMyVerifications);

// GET /api/verifications/:id - Get single verification request
router.get('/:id', getVerificationById);

// PATCH /api/verifications/:id/cancel - Cancel verification request
router.patch('/:id/cancel', cancelVerification);

module.exports = router;