const { Router } = require('express');
const mongoose = require('mongoose');

module.exports = () => {
  const Comments = mongoose.model('Comments');
  const router = Router();

  const getAgg = (keyword, limit = 10) => ([
    [
      { $unwind: `$${keyword}` },
      {
        $group:
          {
            _id: `$${keyword}`,
            count: { $sum: 1 },
          },
      },
      { $sort: { count: -1 } },
      {
        $limit: limit,
      },
    ],
  ]);

  router.get('/hashtags', async (req, res, next) => {
    const result = await Comments.aggregate(getAgg('hashTags', req.query.limit));
    next(result);
  });
  router.get('/mentions', async (req, res, next) => {
    const result = await Comments.aggregate(getAgg('mentions', req.query.limit));
    next(result);
  });
  return router;
};
