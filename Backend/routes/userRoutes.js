const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/userController');
const { protectUser } = require('../middleware/authMiddleware');

// Validation chains
const registerValidation = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
];

const loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];

// Routes
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/profile', protectUser, getUserProfile);

module.exports = router;