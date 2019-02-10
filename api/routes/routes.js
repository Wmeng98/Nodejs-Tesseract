'use strict';

module.exports = function(app) {
  
  var groceryParser = require('../controllers/parseController');
  // base url
  app.route('/')
    .get(groceryParser.getBase);

  // parse receipt route, serialized image passed from the body
  app.route('/parse/:id')
    .post(groceryParser.postImg)
    .get(groceryParser.getImg)
    .delete(groceryParser.deleteImg)
    .put(groceryParser.updateImg);


  // Walmart api endpoints
  app.route('/api/walmart/:upc')
    .get(groceryParser.getUPC)
    .put(groceryParser.updateUPC)
    .delete(groceryParser.deleteUPC);
  app.route('/api/walmart')
    .get(groceryParser.getAllWalmart)
    .post(groceryParser.postUPC);



  

  // Getting any url parameter
  // http://example.com/api/parse?partI=***&partII=***
  app.route('/api/parse')
    .post(groceryParser.postPart)
    .get(groceryParser.getAll);


  // Getting post parameters, need body-parser middleware
  app.route('/api/parse/param')
    .post(groceryParser.postParam);


  // app.route('/parse/:imgFile')
  //   .get(groceryParser.parseImg);
  // //   .get(todoList.getTodo)
  // //   .put(todoList.updateTodo)
  // //   .delete(todoList.deleteTodo);

};