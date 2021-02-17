const config = require('config');
const express = require('express');
require('express-async-errors');
const logger = require('log4js').getLogger('server');
const db = require('../db');
const routers = require('./routers');

const app = express();

const listen = async () => {
  await db.init();
  routers.attach(app);
  const { port } = config;
  app.listen(port, () => {
    logger.info(`App is running at port ${port}`);
  });
};

module.exports = {
  listen,
};
