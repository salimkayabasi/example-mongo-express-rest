const { Router } = require('express');
const users = require('./users');
const comments = require('./comments');
const stats = require('./stats');

module.exports = () => {
  const router = Router();
  router.use('/users', users());
  router.use('/comments', comments());
  router.use('/stats', stats());
  return router;
};
