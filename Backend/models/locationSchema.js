// models/locationSchema.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default: 'Point'
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
    default: [0, 0]
  },
}, { _id: false }); // We set _id: false because this is a sub-document

module.exports = locationSchema;