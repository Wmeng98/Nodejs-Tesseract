'use strict';

var mongoose = require('mongoose');

var Tesseract = require('tesseract.js');
// Schema for model "modelTasks" is registered in the controller
var bModel = mongoose.model('walmartReceiptsDB');

// var request = require('request');

// var base64js = require('base64-js');
// var base64Img = require('base64-img');

var receiptToParse = "customReceipt.png";

// WALMART Specific libraries
var walmartModel = mongoose.model('walmartDataDB');
var walmart = require("../stores/walmart.js"); // import walmart module



exports.getBase = function(req, res) {
  // walmart.testFun("hello world!");
  res.send(JSON.stringify({ Grocery: "Parser Express Server"}));
};


///////////////////////////////////////////////////////////////////////// 

exports.getAll = function(req, res) {
  walmartModel.find({}, function(err, docs) {
    if (err) res.send(err);
    res.json(docs);
  });
};

// find document with particular dataurl
exports.getImg = function(req, res) {
  walmartModel.find({ upc: req.params.id }, function(err, docs) {
    if (err) res.send(err);
    res.json(docs);
  });
};



exports.getAllWalmart = function(req, res) {
  walmartModel.find({}, function(err, docs) {
    if (err) res.send(err);
    res.json(docs);
  });
};
exports.getUPC = function(req, res) {
  walmartModel.find({ upc: req.params.upc }, function(err, item) {
    if (err) res.send(err);
    res.json(item);
  });
};
exports.postUPC = function(req, res) {
  var walmartItem = new walmartModel({
    upc: req.body.upc,
    price: req.body.price
  });
  walmartItem.save(function(err, item) {
    if (err) res.send(err);
    res.json(item);
  });
};
exports.updateUPC = function(req, res) {
  walmartModel.findOneAndUpdate({ upc: req.params.upc }, req.body, {new: true}, function(err, doc) {
    if (err) res.send(err);
    res.json(doc);
  });
};
exports.deleteUPC = function(req, res) { // doesn;t throw an error if document doesn't exist in the collection
  walmartModel.remove({ upc: req.params.upc }, function(err) {
    if (err) res.send(err);
    console.log("removed document with upc: " + req.params.upc);
    res.json("removed document with upc: " + req.params.upc);
  });



};

///////////////////////////////////////////////////////////////////////// 




///////////////////////////////////////////////////////////////////////// 
exports.postImg = function(req, res) {
  console.log(">>> " + req.params.str);
  var new_string = new walmartModel({
    upc: req.params.id
  });
  new_string.save(function(err, str) {
    if (err) res.send(err);
    console.log("no error on post req!")
    res.json(str);
  });
};

// Getting url param
exports.postPart = function(req, res) {
  var new_part_string = new walmartModel({
    dataurl: req.query.partI + req.query.partII
  });
  new_part_string.save(function(err, doc) {
    if (err) res.send(err);
    res.json(doc);
  });
};


// Getting post parameters
exports.postParam = function(req, res) {
  var id = req.body.id;
  var data = req.body.data;
  var new_param_str = new walmartModel({
    dataurl: id + data
  });
  new_param_str.save(function(err, doc) {
    if (err) res.send(err);
    res.json(doc);
  });
}


// REQ.BODY POST PARAM Reference...
// Request body

// While constructing requests, you would be dealing with the request body editor a lot. Postman lets you send almost any kind of HTTP request (If you can't send something, let us know!). The body editor is divided into 4 areas and has different controls depending on the body type.

// form-data

// multipart/form-data is the default encoding a web form uses to transfer data. This simulates filling a form on a website, and submitting it. The form-data editor lets you set key/value pairs (using the key-value editor) for your data. You can attach files to a key as well. Do note that due to restrictions of the HTML5 spec, files are not stored in history or collections. You would have to select the file again at the time of sending a request.

// urlencoded

// This encoding is the same as the one used in URL parameters. You just need to enter key/value pairs and Postman will encode the keys and values properly. Note that you can not upload files through this encoding mode. There might be some confusion between form-data and urlencoded so make sure to check with your API first.

// raw

// A raw request can contain anything. Postman doesn't touch the string entered in the raw editor except replacing environment variables. Whatever you put in the text area gets sent with the request. The raw editor lets you set the formatting type along with the correct header that you should send with the raw body. You can set the Content-Type header manually as well. Normally, you would be sending XML or JSON data here.

// binary

// binary data allows you to send things which you can not enter in Postman. For example, image, audio or video files. You can send text files as well. As mentioned earlier in the form-data section, you would have to reattach a file if you are loading a request through the history or the collection.


///////////////////////////////////////////////////////////////////////// 



///////////////////////////////////////////////////////////////////////// 



///////////////////////////////////////////////////////////////////////// 

// req.body contains kvp of data submitted in the request body
exports.updateImg = function(req, res) {                                // new: true -> returns modified document instead of the original
  walmartModel.findOneAndUpdate({ upc: req.params.id }, req.body, {new: true}, function(err, doc) {
    if (err) res.send(err);
    res.json(doc);
  });
};

///////////////////////////////////////////////////////////////////////// 

exports.deleteImg = function(req, res) {
  walmartModel.remove({ upc: req.params.id }, function(err) {
    if (err) res.send(err);
    console.log("removed document with dataurl: " + req.params.str);
    res.json("removed document with dataurl: " + req.params.str);
  });
};

///////////////////////////////////////////////////////////////////////// 














// var new_task = new task(req.body);
// new_task.save(function(err, task) {
//   if (err) res.send(err);
//   res.json(task);
// });


// // walmartModel.find({}, function(err, img) {
// //   if (err) res.send(err);
// //   // console.log("img is: " + img);
// //   // res.json(img);
// // });
// exports.postImg = function(req, res) {

//       var strBinData = req.body["Field"];

//       // create a blob object to pass the tesseract
  
//       var base64Str = base64js.fromByteArray(strBinData);

//       res.send("done");
  
//       base64Img.img('data:image/png;base64, ' + base64Str, 'api/controllers/img', 'work', function(err, filepath) {
//         if (err) res.send(err);
//         console.log("filepath: " + filepath);
//         //

//         Tesseract.recognize(__dirname + "/img/work.jpg")
//         .progress(function (p) { console.log('progress', p) })
//         .then(function (result) { 
//           console.log(result.text);
//           console.log(getUPCCodes(result.text));
    
//           var UPCList = getUPCCodes(result.text);
//           // for (var i = 0; i < UPCList.length; i += 1) {
//             request(httpUrl + "035000521019", function(error, response, body) {
//               if (error) response.send(error);
      
//               console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//               console.log('body:', body); // Print the HTML for the Google homepage.
              
//               // res.send(response.body);
//             });
//           // } 
//           // send 
//         });

//       });
//   };


// exports.parseImg = function(req, res) {
//   bModel.find({dataurl: req.params.imgFile}, function(err, img) {
//     // console.log(req.params.imgFile);
//     if (err) return res.send(err);



//     Tesseract.recognize(__dirname + '/img/paper.jpg')
//     .progress(function  (p) { console.log('progress', p) })
//     .then(function (result) { 
//       console.log(result.text);
//       console.log(getUPCCodes(result.text));

//       var UPCList = getUPCCodes(result.text);
//       // for (var i = 0; i < UPCList.length; i += 1) {
//         request(httpUrl + "035000521019", function(error, response, body) {
//           if (error) response.send(error);
  
//           console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//           console.log('body:', body); // Print the HTML for the Google homepage.
//         });
//       // } 
//       // send 
//     })
//     res.json(img);
//   });
// };