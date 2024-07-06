// middlewares/rateLimiter.js
const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 100, // Limit von 100 Anfragen pro IP innerhalb von 15 Minuten
  message: 'Zu viele Anfragen von dieser IP, bitte versuchen Sie es später erneut.'
});
