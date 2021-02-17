const { Router } = require('express');
const mongoose = require('mongoose');
const crud = require('../crud');

module.exports = () => {
  const router = Router();

  const Users = mongoose.model('Users');
  const Comments = mongoose.model('Comments');

  const userRouter = crud(Users);

  userRouter.get('/:id/comments', async (req, res, next) => {
    const userId = req.params.id;
    const comments = await Comments.find({
      userId,
    });
    next(comments || []);
  });

  router.use('/users', userRouter);
  router.use('/comments', crud(Comments));
  return router;
};
