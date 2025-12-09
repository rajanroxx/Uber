const Captain = require('../models/Captain');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new captain
// @route   POST /api/captains/register
// @access  Public
const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, vehicleDetails, licenseNumber } = req.body;

  try {
    const captainExists = await Captain.findOne({ email });

    if (captainExists) {
      return res.status(400).json({ message: 'Captain already exists with this email' });
    }

    const captain = await Captain.create({
      name,
      email,
      password,
      vehicleDetails,
      licenseNumber,
    });

    if (captain) {
      res.status(201).json({
        _id: captain._id,
        name: captain.name,
        email: captain.email,
        token: generateToken(captain._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid captain data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Authenticate captain & get token
// @route   POST /api/captains/login
// @access  Public
const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const captain = await Captain.findOne({ email });

    if (captain && (await bcrypt.compare(password, captain.password))) {
      res.json({
        _id: captain._id,
        name: captain.name,
        email: captain.email,
        token: generateToken(captain._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get captain profile
// @route   GET /api/captains/profile
// @access  Private
const getCaptainProfile = async (req, res) => {
    // req.user is populated by protectCaptain middleware
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            vehicleDetails: req.user.vehicleDetails,
            licenseNumber: req.user.licenseNumber,
            isAvailable: req.user.isAvailable,
        });
    } else {
        res.status(404).json({ message: 'Captain not found' });
    }
};

module.exports = {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
};