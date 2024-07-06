// app.js
const express = require('express');
const mongoose = require('mongoose');
const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const https = require('https');

const app = express();
app.use(express.json());

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/tasks', tasksRouter);
app.use(errorHandler);

mongoose.connect(config.dbUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;


// HTTPS Setup in app.js
const options = {
  // key: fs.readFileSync('path/to/key.pem'),
  // cert: fs.readFileSync('path/to/cert.pem')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});