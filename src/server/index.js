const config = require('config');
const express = require('express');
const logger = require('log4js').getLogger('server');

const app = express();

module.exports = {
  listen: ()=> {
    const {port} = config;
    app.listen(port, ()=> {
      logger.info(`App is running at port ${port}`)
    })
  }
}
