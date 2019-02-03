var express = require('express'); // import express module
var app = express(); // create express app
var port = 3000;

// Schema registered here for model: todo
baseModel = require('./api/models/testModel');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// mongoose instance url connection
mongoose.Promise = global.Promise;

// Important Note:
  // But Commiting your username and password to your public repo is 
  // sometimes very dangerous so never commit them into public repositories, 
  // Instead you can use environment variables to store the url (containing username 
//   and password) , to do this in your local system

// mongoose.connect('mongodb://localhost/parseTestdb', {useNewUrlParser: true});
var url = process.env.MONGOLAB_URI;
mongoose.connect(url, {useNewUrlParser: true});


mongoose.connection.on("open", function(){
  console.log("mongodb is connected!!");

  //mongoose.connection.db.collectionNames(function)
});
// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// CORS on ExpressJS
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// import routes
var routes = require('./api/routes/routes');
routes(app); // register the route

app.listen(process.env.PORT || port, function() {
  console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
});


// console.log("groceryParser restful api started on port: " + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

