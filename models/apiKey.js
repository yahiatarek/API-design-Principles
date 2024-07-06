// models/apiKey.js
const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
  keyId: String,
  secretKey: String,
  accessLevel: {
    type: String,
    enum: ['read-only', 'read-write'],
    default: 'read-only'
  },
  appId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ApiKey', apiKeySchema);
