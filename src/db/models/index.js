const mongoose = require('mongoose');
const user = require('./users');
const comment = require('./comments');

const load = () => {
  [user, comment].forEach(({ modelName, schema }) => {
    mongoose.model(modelName, schema);
  });
};

module.exports = {
  load,
};
