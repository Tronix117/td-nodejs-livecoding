const http = require('http');

const PartyController = require('./controllers/party');
const bodyMiddleware = require('./middlewares/body');
const errorMiddleware = require('./middlewares/error');
const notFoundMiddleware = require('./middlewares/notFound');


function handleRequest(req, res) {
  const middlewares = [
    bodyMiddleware,
    errorMiddleware,
    PartyController.middleware,
    notFoundMiddleware,
  ]

  // @todo apply middleware one after the other
  // remplacer la ligne suivante, par quelque chose de dynamique
  // bodyMiddleware(req, res, (req, res) => errorMiddleware(req, res, handleRouting));
}


const server = http.createServer(handleRequest);
server.listen(8085);