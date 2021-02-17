const { connectLogger, getLogger } = require('log4js');
const OpenApiValidator = require('express-openapi-validator');
const bodyParser = require('body-parser');
const path = require('path');
const v1 = require('./v1');
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
    app.use('/v1', v1());
    app.use('/', (req, res) => {
      res.redirect('/v1/users');
    });
    app.use(notFound);
    app.use(onResponse);
  },
};
