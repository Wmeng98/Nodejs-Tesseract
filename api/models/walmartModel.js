'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var walmartSchema = new schema({
  upc: {
    type: Number,
    required: "upc code for walmart item required"
  },
  productName: {
    type: String,
    default: "N/A"
  },
  category: {
    type: String,
    default: "unclassified"
  },
  quantity: {
    type: Number,
    default: 1 // assumption at least 1 item
  },
  price: {
    type: Number, // workaround store price as cents 
    required: "missing, need to provide item price"
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('walmartDataDB', walmartSchema);

