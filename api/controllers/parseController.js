'use strict';

var mongoose = require('mongoose');

var Tesseract = require('tesseract.js');
// Schema for model "modelTasks" is registered in the controller
var bModel = mongoose.model('baseModel');

// exports.postImg = function(req, res) {
//   var newBasic = new bModel(req.body);
//   newBasic.save(function(err, base) {
//     if (err) {
//       console.log("Error occur on post...");
//       res.send(err);
//     }
//     console.log("post success: ");
//     console.log(base);
//     res.json(base);
//   });
// };

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

    // Tesseract.recognize(__dirname + '/img/img.jpg')
    //   .then(function(result){

    //     console.log("result is: " + result[0]);
    // });

    Tesseract.recognize(__dirname + '/img/img.jpg')
    .progress(function  (p) { console.log('progress', p)    })
    .then(function (result) { 
      console.log(result.text);
      console.log(getUPCCodes(result.text));

      // send 
    })


    // // Recognize text of any language in any format
    // console.log(__dirname + '/img/img.jpg');
    // tesseract.process(__dirname + '/img/img.jpg',function(err, text) {
    //   if(err) {
    //       console.error(err);
    //   } else {
    //       console.log(text);
    //   }
    // });

    res.json(img);
  });
};