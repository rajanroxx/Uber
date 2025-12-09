const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const locationSchema = require('./locationSchema');

const captainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
  vehicleDetails: {
    model: { type: String, required: true },
    make: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    licensePlate: {type: String, required: true, unique: true }
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  documents: {
    // Array of strings to store URLs of uploaded documents (e.g., license, registration)
    type: [String],
    default: [],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  location: {
    type: {
      type: locationSchema,
      index: '2dsphere',
    }
  },
}, {
  timestamps: true,
});

// Password Hashing Middleware
captainSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
module.exports = mongoose.model('Captain', captainSchema);