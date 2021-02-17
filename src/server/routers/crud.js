const { Router } = require('express');

module.exports = (model, router = Router()) => {
  router.post('/', async (req, res, next) => {
    const result = await model.create(req.body);
    res.status(201);
    next(result);
  });
  router.get('/', async (req, res, next) => {
    const result = await model.find();
    next(result || []);
  });
  router.get('/:id', async (req, res, next) => {
    const result = await model.findOne({ id: req.params.id });
    if (!result) {
      res.status(404);
    }
    next(result);
  });
  router.delete('/:id', async (req, res, next) => {
    await model.findOneAndRemove({ id: req.params.id });
    res.status(204);
    next('');
  });
  router.patch('/:id', async (req, res, next) => {
    const {
      id,
      ...update
    } = req.body;
    const result = await model.findOneAndUpdate({ id: req.params.id }, update);
    next(result);
  });
  return router;
};
