var bodyParser = require('body-parser'),
express = require('express'),
app = express(),
port = process.env.PORT || 3000;
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
  
  
var routes = require('./api/routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Events App RESTful API server started on: ' + port);

// https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
