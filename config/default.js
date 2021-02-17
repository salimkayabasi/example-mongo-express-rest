const { config } = require('dotenv');

const { env } = process;

config();

module.exports = {
  port: env.PORT || '3000',
  log: {
    level: env.LOG_LEVEL || 'INFO',
  },
  db: {
    url: env.DB_URL,
  },
};
