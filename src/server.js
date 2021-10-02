'use strict';

const express = require('express');
const app = express();

// Importing modules for use
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
// const validator = require('./middleware/validator');

// Global Middleware
app.use(logger);
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello Main Server :D');
});

// Telling app to use these error handlers
app.use('*', notFoundHandler);
app.use(errorHandler);

// Export server to index.js for use
module.exports = {
  server: app,
  start: port => {
    if (!port) {
      throw new Error('Missing port :(');
    }
    app.listen(port, () => console.log(`Server up on ${port}`));
  }
}
