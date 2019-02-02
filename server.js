var express = require('express'); // import express module
var app = express(); // create express app
var port = 3000;

// Schema registered here for model: todo
baseModel = require('./api/models/testModel');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// mongoose instance url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/parseTestdb', {useNewUrlParser: true});

mongoose.connection.on("open", function(){
  console.log("mongodb is connected!!");

  //mongoose.connection.db.collectionNames(function)
});
// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// import routes
var routes = require('./api/routes/routes');
routes(app); // register the route

app.listen(port);

console.log("groceryParser restful api started on port: " + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

