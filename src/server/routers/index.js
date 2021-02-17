const Router = require('express');
const mongoose = require('mongoose');
const { connectLogger, getLogger } = require('log4js');
const crud = require('./crud');
const { notFound, onResponse } = require('./handlers');

module.exports = {
  attach: (app) => {
    app.use(connectLogger(getLogger('router')));
    const router = Router();
    Object.values(mongoose.models).forEach(({ modelName }) => {
      const r = crud(mongoose.model(modelName));
      router.use(`/${modelName.toLowerCase()}`, r);
    });
    app.use('/v1', router);
    app.use(notFound);
    app.use(onResponse);
  },
};
