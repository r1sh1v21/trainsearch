const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true        
  }
});

module.exports = mongoose.model('Station', stationSchema);