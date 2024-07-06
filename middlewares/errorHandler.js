// middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ein unerwarteter Fehler ist aufgetreten' });
};
