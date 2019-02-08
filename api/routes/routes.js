'use strict';

module.exports = function(app) {
  
  var basicParser = require('../controllers/parseController');
  // base url
  app.route('/')
    .get(basicParser.getBase);

  // parse receipt route, serialized image passed from the body
  app.route('/parse/:str')
    .post(basicParser.postImg)
    .get(basicParser.getImg)
    .delete(basicParser.deleteImg)
    .put(basicParser.updateImg);


  // Getting any url parameter
  // http://example.com/api/parse?partI=***&partII=***
  app.route('/api/parse')
    .post(basicParser.postPart)
    .get(basicParser.getAll);


  // Getting post parameters, need body-parser middleware
  app.route('/api/parse/param')
    .post(basicParser.postParam);


  // app.route('/parse/:imgFile')
  //   .get(basicParser.parseImg);
  // //   .get(todoList.getTodo)
  // //   .put(todoList.updateTodo)
  // //   .delete(todoList.deleteTodo);

};