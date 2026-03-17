const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  station: { 
    type: String, 
    required: true 
  },
  distanceFromPrev: { 
    type: Number, 
    required: true,
    min: 0       
  },
  departure: { 
    type: String, 
    required: true,
    match: /^([0-1]\d|2[0-3]):([0-5]\d)$/  // must be "HH:MM" format
  }
});

const trainSchema = new mongoose.Schema({
  trainNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  trainName: { 
    type: String, 
    required: true 
  },
  stops: {
    type: [stopSchema],   
    required: true,
    validate: {
      validator: (stops) => stops.length >= 2,
      message: 'A train must have at least 2 stops'
    }
  }
});

module.exports = mongoose.model('Train', trainSchema);