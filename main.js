const http = require('http');
const Party = require('./models/party');

function bodyMiddleware(req, res, next) {
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

function errorMiddleware(req, res, next) {
  try {
    next(req, res);
  } catch (err) {
    res.statusCode = 500;
    res.end(err.message);
  }
}

function handleRequest(req, res) {
  bodyMiddleware(req, res, (req, res) => errorMiddleware(req, res, handleRouting));
}

function handleRouting(req, res) {
  if (req.method === 'POST' && req.url === '/party') {
    Party.currentParty = new Party(req.body.min || 0, req.body.max || 100);
    res.statusCode = 204;
  } else if (req.method === 'PUT' && req.url === '/party/current') {
    if (!Party.currentParty) {
      throw new Error('No party');
    }

    const result = Party.currentParty.guess(req.body);
    if (result === '=') {
      res.write(`Félicitation, le chiffre était ${Party.currentParty.number}`);
    } else {
      res.write(result); // + or -
    }
    res.statusCode = 200;
  } else if (req.method === 'GET' && req.url === '/party/current') {
    if (!Party.currentParty) {
      throw new Error('No party');
    }

    res.statusCode = 200;
    res.write(Party.currentParty.guesses.join(', '));
  } else {
    res.statusCode = 404;
  }

  res.end();
}


const server = http.createServer(handleRequest);
server.listen(8085);