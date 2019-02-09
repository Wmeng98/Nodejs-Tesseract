'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;


var basicSchema = new schema({
  dataurl: {
    type: String,
    required: "Name of basic is required"
  }
}); // collection is necessary here to specify

module.exports = mongoose.model('walmartReceiptsDB', basicSchema); // 3rd param is collection name
// if collection not specified as a parameter in the new schema object, 
// then collection will be based off the the name of the  model given in mongoose.models(...,...)
// creates a collection called baseModels in the parseTestdb
// db.collection.find();
// collection is a placeholder...
  