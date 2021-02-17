const mongoose = require('mongoose');
const crud = require('../crud');

module.exports = () => {
  const Users = mongoose.model('Users');
  const Comments = mongoose.model('Comments');

  const router = crud(Users);

  router.get('/:id/comments', async (req, res, next) => {
    const userId = req.params.id;
    const comments = await Comments.find({
      userId,
    });
    next(comments || []);
  });
  return router;
};
