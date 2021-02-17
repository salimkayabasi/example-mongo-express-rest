const { Router } = require('express');
const mongoose = require('mongoose');
const { connectLogger, getLogger } = require('log4js');
const OpenApiValidator = require('express-openapi-validator');
const bodyParser = require('body-parser');
const path = require('path');
const crud = require('./crud');
const { notFound, onResponse } = require('./handlers');

const apiSpec = path.join(process.cwd(), 'docs/openapi.yml');

module.exports = {
  attach: (app) => {
    app.use(connectLogger(getLogger('router')));
    app.use(bodyParser.json());

    app.use(
      OpenApiValidator.middleware({
        apiSpec,
        validateApiSpec: true,
        validateRequests: true,
      }),
    );
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
