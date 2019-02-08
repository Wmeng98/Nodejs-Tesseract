'use strict';

module.exports = function(app) {
  
  var basicParser = require('../controllers/parseController');
  // base url
  app.route('/')
    .get(basicParser.getBase);

  // parse receipt route, serialized image passed from the body
  app.route('/parse/:str')
    .post(basicParser.postImg);


  // Getting any url parameter
  // http://example.com/api/parse?partI=***&partII=***
  app.route('/api/parse')
    .post(basicParser.postPart);


  // Getting post parameters, need body-parser middleware
  app.route('/api/parse/param')
    .post(basicParser.postParam);


  // app.route('/parse/:imgFile')
  //   .get(basicParser.parseImg);
  // //   .get(todoList.getTodo)
  // //   .put(todoList.updateTodo)
  // //   .delete(todoList.deleteTodo);

};