'use strict';

let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

declare module 'express' {
  interface Request {
    body: any;
    session: any;
  }
}

// view engine setup
// serve static files
app.use(express.static(path.join(__dirname, '../public')));
// web dependencies from node_modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve API V1 routes - should change wenn API on other node exists
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger.json');
app.use('/', require('./api'));
app.use(['/docs', '/apidoc', '/swagger'], swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Access the session as req.session
app.get('/session', function(req, res, next) {
  if (!req.session.views) {
    req.session.views = 0;
  }
  req.session.views++;

  res.setHeader('Content-Type', 'text/html');
  res.write('<p>views: ' + req.session.views + '</p>');
  res.write('<p>loginstate: ' + req.session.loginstate + '</p>');
  res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
  res.end();
});

// catch not handled and return 404
app.use((req, res, next) => next({
  message: 'Not Found',
  status: 404,
  stack: (new Error()).stack
}));

function isApi(req) {
  return req.url.indexOf('/api/') === 0;
}

export = app;
