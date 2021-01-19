module.exports = function errorMiddleware(req, res, next) {
  try {
    next(req, res);
  } catch (err) {
    res.statusCode = 500;
    res.end(err.message);
  }
}