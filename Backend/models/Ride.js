const mongoose = require('mongoose');
const locationSchema = require('./locationSchema');

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  cordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
});

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',

    },
    pickupLocation: {
        type: {
            type: locationSchema,
            required: true,
        },
        dropoffLocation: {
            type: locationSchema,
            required: true,
        },
        status: {
            type: String,
            enum: ['requested', 'accepted', 'ongoing', 'completed', 'cancelled'],
            default: 'requested',
        },
        fare: {
            type: Number,
        },
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model('Ride', rideSchema);