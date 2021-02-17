const { config } = require('dotenv');

const { env } = process;

config();

module.exports = {
  log: {
    level: env.LOG_LEVEL || 'INFO',
  },
};
