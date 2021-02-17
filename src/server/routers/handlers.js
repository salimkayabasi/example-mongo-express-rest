const createError = require('http-errors');

const notFound = (req, res, next) => {
  res.status(404);
  next(new createError.NotFound());
};

// eslint-disable-next-line no-unused-vars
const onResponse = (data, req, res, next) => {
  if (data instanceof Error) {
    const err = data;
    if (err.statusCode === 200) {
      res.status(500);
    }
    res.json({
      error: err.message,
    });
    return;
  }
  res.json(data);
};

module.exports = {
  notFound,
  onResponse,
};
