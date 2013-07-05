
/**
 * Module dependencies.
 */

var express = require('express'),
  app = express(),
  routes = require('./routes'),
  rest = require('./routes/rest'),
  http = require('http'),
  path = require('path');

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

// routes;
app.get('/', routes.index);
app.get('/notes', rest.read);
app.post('/note', rest.create);
app.post('/delete', rest.remove);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
