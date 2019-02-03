var express = require('express'); // import express module
var app = express(); // create express app
var port = 3000;

var Tesseract = require('tesseract.js');
// Schema for model "modelTasks" is registered in the controller
// var bModel = mongoose.model('baseModel');

var request = require('request');

var https = require('https');

var base64js = require('base64-js');
var base64Img = require('base64-img');

var walmart_APIKey = process.env.WALMART_API
var httpUrl = "http://api.walmartlabs.com/v1/items?apiKey=" + walmart_APIKey + "&upc=" // hide api key when publish to github
var receiptToParse = "customReceipt.png";

// var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// function to retrieve array of upc codes
function getUPCCodes(text) {
  // console.log("text >>> ");
  // console.log(text);

  var words = text.split(" ");
  var tempUCP = "";
  var UCPList = new Array();

  // iterate through each character in the string
  var currUCPLength = 0;

  for (var i = 0; i < words.length; i += 1) {
    // console.log("word >>> " + words[i]);
    // only consider words where length of string >= 12
    
    if (words[i].includes("*")) { // assumption reached-> ACCOUNT # LINE, hence past actual items list in receipt
      return UCPList;
    }
    if (words[i].length >= 12) {
      for (var j = 0; j < words[i].length; j += 1) {
        // If char in word is a number, add to tempUCP
        var parsed = parseInt(words[i][j], 10)
        if (!isNaN(parsed)) {
          if (currUCPLength == 11) { // add last integer to ucp and restart count
            tempUCP += words[i][j];

            // compare with exceptional condition
            if (tempUCP != "111111111111") {
              UCPList.push(tempUCP);
            }
            // Reset, look for new ucp
            currUCPLength = 0;
            tempUCP = "";
          } else {
            tempUCP += words[i][j];
            currUCPLength += 1;
          }
        }
        else { // Not an integer
          // reset counts
          tempUCP = "";
          currUCPLength = 0;
        }
      }
    }
  }

  console.log("UCP list length: " + UCPList.length);
  for (var i = 0; i < UCPList.length; i += 1) {
    console.log(" >> " + UCPList[i]);
  }
  return UCPList;
}

// Middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '150mb',
  extended: true
}));

// CORS on ExpressJS
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// // import routes
// var routes = require('./api/routes/routes');
// routes(app); // register the route

app.listen(process.env.PORT || port, function() {
  console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
});



app.get('/', (req, res) => {
  console.log("type of req >>> " + typeof req);
  res.send(JSON.stringify({"Grocery": "RESTful API"}));
});



// post method for img
app.post('/parse', (req, res) => {
  
  // Temporary solution, use self made receipt with UPCs that are available

  // var strBinData = req.get('Field'); // base64 encoded string
  // console.log("req body json: " + JSON.stringify(req.body.json()));
  // console.log("encoded: " + strBinData);
  // console.log("stringify",+req.stringify);
  // console.log("base64",+req.base64Str);

  // // var base64Str = base64js.fromByteArray(strBinData);
  

  // console.log('>>> ' + base64Str);

  // base64Img.img('data:image/jpg;base64,' + base64Str, 'img', 'work', function(err, filepath) {
  //   if (err) res.send(err);
  //   console.log("filepath: " + filepath);
  // });


      // tesseract function goes here
      Tesseract.recognize(__dirname + '/api/controllers/img/' + receiptToParse)
      .progress(function  (p) { console.log('progress', p) })
      .then(function (result) { 
        console.log(result.text);
        console.log(getUPCCodes(result.text));
  
        var UPCList = getUPCCodes(result.text);
        
        
        for (var i = 0; i < UPCList.length; i += 1) {
          request(httpUrl + UPCList[i], function(error, response, body) {
            if (error) res.send(error);
            
            var record = "";
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            var nm = body.name;
            
            var date = Date.now;
            var dt = date.toString();
            
            var sale = body.salePrice;
            var upcode = body.upc;
            var thumb = body.thumbnailImage;

            record += nm + "#";
            record += dt + "#";
            record += sale + "#";
            record += upcode + "#";
            if (i == UPCList.length) {
              record += thumb;            
            } else {
              record += thumb + "!";
            }
          });
        }
        res.send(record); // send string
        // send 
      });
    });
      // console.info('\n\nPOST completed');


// console.log("groceryParser restful api started on port: " + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

