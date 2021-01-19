module.exports = function bodyMiddleware(req, res, next) {
  if (['GET', 'HEAD', 'DELETE', 'OPTIONS'].includes(req.method)) {
    return next(req, res);
  }

  let data = '';

  req.on('data', (chunk) => data += chunk);
  req.on('end', () => {
    try {
      data = JSON.parse(data);
    } catch {
      res.statusCode = 400
      return res.end('JSON body is invalid');
    }

    req.body = data;

    next(req, res);
  })
}