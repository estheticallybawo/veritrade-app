const VerificationRequest = require('../models/VerificationRequest');
const Supplier = require('../models/Supplier');

// Submit verification request
const submitVerification = async (req, res) => {
  try {
    const { business_name, registration_number } = req.body;
    const buyer_id = req.user ? req.user.id : 1; // Temporary: will use auth middleware later

    // Validate required fields
    if (!business_name || !registration_number) {
      return res.status(400).json({ 
        message: 'Business name and registration number are required' 
      });
    }

    // Create verification request
    const verification = await VerificationRequest.create({
      buyer_id,
      business_name,
      registration_number,
      status: 'pending' // Automatically set to pending on submission
    });

    res.status(201).json({
      message: 'Verification request submitted successfully',
      verification: {
        id: verification.id,
        business_name: verification.business_name,
        registration_number: verification.registration_number,
        status: verification.status,
        created_at: verification.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all verification requests for logged-in buyer
const getMyVerifications = async (req, res) => {
  try {
    const buyer_id = req.user ? req.user.id : 1; // Temporary

    const verifications = await VerificationRequest.findAll({
      where: { buyer_id },
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

// Get single verification request by ID
const getVerificationById = async (req, res) => {
  try {
    const { id } = req.params;

    const verification = await VerificationRequest.findByPk(id);

    if (!verification) {
      return res.status(404).json({ message: 'Verification request not found' });
    }

    res.status(200).json({
      message: 'Verification request retrieved successfully',
      verification
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Cancel verification request
const cancelVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const buyer_id = req.user ? req.user.id : 1; // Temporary

    const verification = await VerificationRequest.findOne({
      where: { id, buyer_id }
    });

    if (!verification) {
      return res.status(404).json({ message: 'Verification request not found' });
    }

    // Only allow cancellation if status is draft or pending
    if (!['draft', 'pending'].includes(verification.status)) {
      return res.status(400).json({ 
        message: 'Cannot cancel verification in current status' 
      });
    }

    verification.status = 'cancelled';
    await verification.save();

    res.status(200).json({
      message: 'Verification request cancelled successfully',
      verification
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { 
  submitVerification, 
  getMyVerifications, 
  getVerificationById, 
  cancelVerification 
};