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


    Tesseract.recognize(__dirname + '/img/img.jpg')
      .then(function(result){
        console.log(result)
    });
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