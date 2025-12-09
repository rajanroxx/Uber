const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
} = require('../controllers/captainController');
const { protectCaptain } = require('../middleware/authMiddleware');

// Validation chains
const registerValidation = [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    body('licenseNumber', 'License number is required').not().isEmpty(),
    body('vehicleDetails.model', 'Vehicle model is required').not().isEmpty(),
    body('vehicleDetails.make', 'Vehicle make is required').not().isEmpty(),
    body('vehicleDetails.year', 'Vehicle year is required').isNumeric(),
    body('vehicleDetails.color', 'Vehicle color is required').not().isEmpty(),
    body('vehicleDetails.licensePlate', 'Vehicle license plate is required').not().isEmpty(),
];

const loginValidation = [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
];


// Routes
router.post('/register', registerValidation, registerCaptain);
router.post('/login', loginValidation, loginCaptain);
router.get('/profile', protectCaptain, getCaptainProfile);

module.exports = router;