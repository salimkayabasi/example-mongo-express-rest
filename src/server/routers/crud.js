const { Router } = require('express');
const bodyParser = require('body-parser');

module.exports = (model, router = Router()) => {
  router.post('/', bodyParser.json(), async (req, res, next) => {
    const result = await model.create(req.body);
    next(result);
  });
  router.get('/', async (req, res, next) => {
    const result = await model.find();
    next(result);
  });
  router.get('/:id', async (req, res, next) => {
    const result = await model.findOne({ id: req.params.id });
    next(result);
  });
  router.delete('/:id', async (req, res, next) => {
    const result = await model.findOneAndRemove({ id: req.params.id });
    next(result);
  });
  router.delete('/:id', bodyParser.json(), async (req, res, next) => {
    const result = await model.findOneAndUpdate({ id: req.params.id }, req.body);
    next(result);
  });
  return router;
};
