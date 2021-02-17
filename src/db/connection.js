const config = require('config');
const mongoose = require('mongoose');
const logger = require('log4js').getLogger('db:connection');

module.exports = {
  connect: async () => {
    await mongoose.connect(config.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    const { connection } = mongoose;
    connection.once('error', (err) => {
      logger.error(err);
    });
    connection.once('open', () => {
      logger.info('Connected');
    });
  },
};
