// middlewares/security.js
const rateLimit = require('express-rate-limit');
const https = require('https');
const fs = require('fs');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});

const validateNonce = (req, res, next) => {
  const { nonce, timestamp } = req.headers;
  if (!nonce || !timestamp) {
    return res.status(400).json({ error: 'Missing nonce or timestamp' });
  }
  const now = Date.now();
  if (now - parseInt(timestamp) > 300000) {
    return res.status(400).json({ error: 'Request timestamp is too old' });
  }
  next();
};

module.exports = { rateLimiter, validateNonce };

