const mongoose = require('mongoose');

const HealthDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, //ObjectID cho schema khác
    ref: 'User', // Thay 'User' bằng tên của model người dùng nếu cần
    required: true,
  },
  steps: {
    type: Number,
    required: true,
  },
  heartRate: {
    type: Number,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create Model HealthData
const HealthData = mongoose.model('HealthData', HealthDataSchema);

module.exports = HealthData;

