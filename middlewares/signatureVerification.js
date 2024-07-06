const crypto = require('crypto');
const ApiKey = require('../models/apiKey');

const verifySignature = async (req, res, next) => {
  const { signature, timestamp, nonce } = req.headers;
  const { appId } = req.query;

  if (!signature || !timestamp || !nonce || !appId) {
    return res.status(400).json({ error: 'Missing required headers or query parameters' });
  }

  try {
    const apiKey = await ApiKey.findOne({ appId });
    if (!apiKey) {
      return res.status(401).json({ error: 'Invalid App ID' });
    }

    const params = `${req.method}${req.originalUrl}${JSON.stringify(req.body)}${timestamp}${nonce}`;
    const hash = crypto.createHmac('sha256', apiKey.secretKey).update(params).digest('hex');

    if (hash !== signature) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const now = Date.now();
    if (now - parseInt(timestamp) > 300000) {
      return res.status(400).json({ error: 'Request timestamp is too old' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = verifySignature;
