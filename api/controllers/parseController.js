'use strict';

var mongoose = require('mongoose');

var Tesseract = require('tesseract.js');
// Schema for model "modelTasks" is registered in the controller
var bModel = mongoose.model('baseModel');

var request = require('request');
var httpUrl = "http://api.walmartlabs.com/v1/items?apiKey=njrkzcmpr9akvsxje7peh6z5&upc=" // hide api key when publish to github

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


exports.getBase = function(req, res) {
  res.send(JSON.stringify({ Hello: "World"}));
};


exports.getImg = function(req, res) {
  bModel.find({}, function(err, img) {
    if (err) res.send(err);
    // console.log("img is: " + img);
    res.json(img);
  });
};

exports.parseImg = function(req, res) {
  bModel.find({dataurl: req.params.imgFile}, function(err, img) {
    // console.log(req.params.imgFile);
    if (err) return res.send(err);



    Tesseract.recognize(__dirname + '/img/paper.jpg')
    .progress(function  (p) { console.log('progress', p) })
    .then(function (result) { 
      console.log(result.text);
      console.log(getUPCCodes(result.text));

      var UPCList = getUPCCodes(result.text);
      // for (var i = 0; i < UPCList.length; i += 1) {
        request(httpUrl + "035000521019", function(error, response, body) {
          if (error) response.send(error);
  
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML for the Google homepage.
        });
      // } 
      // send 
    })
    res.json(img);
  });
};