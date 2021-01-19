module.exports = function notFoundMiddleware(req, res) {
  res.statusCode = 404;
  res.end();
}