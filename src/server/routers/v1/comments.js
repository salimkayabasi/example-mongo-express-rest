const mongoose = require('mongoose');
const crud = require('../crud');

module.exports = () => {
  const Comments = mongoose.model('Comments');
  return crud(Comments);
};
