const { configure } = require('log4js')
const config = require('config');

const configuration = {
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'coloured',
      },
    },
  },
  categories: {
    default: {
      level: config.log.level,
      appenders: ['out'],
    },
  },
};

configure(configuration);
