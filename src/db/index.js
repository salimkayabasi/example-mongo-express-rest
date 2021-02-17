const { connect } = require('./connection');
const { load } = require('./models');

module.exports = {
  init: async () => {
    await connect();
    load();
  },
};
