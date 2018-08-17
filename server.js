var bodyParser = require('body-parser'),
express = require('express'),
cors = require('cors'),
path = require('path'),
routes = require('./api/routes'),
app = express(),
port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
  
routes(app);

// UI
app.use(express.static(path.resolve(__dirname, 'ui')));

app.listen(port);

console.log('Events App RESTful API server started on: ' + port);

// https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
