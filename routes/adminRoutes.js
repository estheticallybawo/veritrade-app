// const express = require('express');
// const router = express.Router();
// const { 
//   getPendingVerifications,
//   getAllVerifications,
//   verifyRequest, 
//   rejectRequest, 
//   flagRequest 
// } = require('../controllers/adminController');

// // GET /api/admin/verifications/pending - Get all pending requests
// router.get('/verifications/pending', getPendingVerifications);

// // GET /api/admin/verifications - Get all verification requests (with optional status filter)
// router.get('/verifications', getAllVerifications);

// // PATCH /api/admin/verifications/:id/verify - Approve verification request
// router.patch('/verifications/:id/verify', verifyRequest);

// // PATCH /api/admin/verifications/:id/reject - Reject verification request
// router.patch('/verifications/:id/reject', rejectRequest);

// // PATCH /api/admin/verifications/:id/flag - Flag verification request
// router.patch('/verifications/:id/flag', flagRequest);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  getPendingVerifications,
  getAllVerifications,
  verifyRequest, 
  rejectRequest, 
  flagRequest 
} = require('../controllers/adminController');
const { authenticate, requireRole } = require('../middleware/authMiddleware');

// All admin routes require authentication and ADMIN role
router.use(authenticate);
router.use(requireRole('admin'));

router.get('/verifications/pending', getPendingVerifications);
router.get('/verifications', getAllVerifications);
router.patch('/verifications/:id/verify', verifyRequest);
router.patch('/verifications/:id/reject', rejectRequest);
router.patch('/verifications/:id/flag', flagRequest);

module.exports = router;