const VerificationRequest = require('../models/VerificationRequest');
const Supplier = require('../models/Supplier');

// Get all pending verification requests (Admin only)
const getPendingVerifications = async (req, res) => {
  try {
    const verifications = await VerificationRequest.findAll({
      where: { status: 'pending' },
      order: [['createdAt', 'ASC']] // Oldest first
    });

    res.status(200).json({
      message: 'Pending verification requests retrieved successfully',
      count: verifications.length,
      verifications
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all verification requests (Admin only)
const getAllVerifications = async (req, res) => {
  try {
    const { status } = req.query;

    const where = status ? { status } : {};

    const verifications = await VerificationRequest.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      message: 'Verification requests retrieved successfully',
      count: verifications.length,
      verifications
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify (approve) a verification request
const verifyRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { admin_notes } = req.body;
    // const admin_id = req.user ? req.user.id : 1; // Temporary
    const admin_id = req.user.id;

    const verification = await VerificationRequest.findByPk(id);

    if (!verification) {
      return res.status(404).json({ message: 'Verification request not found' });
    }

    if (verification.status !== 'pending') {
      return res.status(400).json({ 
        message: 'Only pending requests can be verified' 
      });
    }

    // Check if business exists in suppliers database
    const supplier = await Supplier.findOne({
      where: { registration_number: verification.registration_number }
    });

    verification.status = 'verified';
    verification.reviewed_at = new Date();
    verification.reviewed_by = admin_id;
    verification.admin_notes = admin_notes || 'Business verified successfully';
    await verification.save();

    res.status(200).json({
      message: 'Verification request approved',
      verification,
      supplier_found: !!supplier
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reject a verification request
const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { admin_notes } = req.body;
    // const admin_id = req.user ? req.user.id : 1; // Temporary
    const admin_id = req.user.id;

    const verification = await VerificationRequest.findByPk(id);

    if (!verification) {
      return res.status(404).json({ message: 'Verification request not found' });
    }

    if (verification.status !== 'pending') {
      return res.status(400).json({ 
        message: 'Only pending requests can be rejected' 
      });
    }

    verification.status = 'rejected';
    verification.reviewed_at = new Date();
    verification.reviewed_by = admin_id;
    verification.admin_notes = admin_notes || 'Business verification rejected';
    await verification.save();

    res.status(200).json({
      message: 'Verification request rejected',
      verification
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Flag a verification request
const flagRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { admin_notes } = req.body;
    // const admin_id = req.user ? req.user.id : 1; // Temporary
    const admin_id = req.user.id;

    const verification = await VerificationRequest.findByPk(id);

    if (!verification) {
      return res.status(404).json({ message: 'Verification request not found' });
    }

    if (verification.status !== 'pending') {
      return res.status(400).json({ 
        message: 'Only pending requests can be flagged' 
      });
    }

    verification.status = 'flagged';
    verification.reviewed_at = new Date();
    verification.reviewed_by = admin_id;
    verification.admin_notes = admin_notes || 'Business requires further review';
    await verification.save();

    res.status(200).json({
      message: 'Verification request flagged',
      verification
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { 
  getPendingVerifications,
  getAllVerifications,
  verifyRequest, 
  rejectRequest, 
  flagRequest 
};