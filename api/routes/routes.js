'use strict';

module.exports = function(app) {
  
  var basicParser = require('../controllers/parseController');
  // base url
  app.route('/')
    .get(basicParser.getBase);

  // parse receipt route, serialized image passed from the body
  app.route('/parse/:str')
    .post(basicParser.postImg);

  // app.route('/parse/:imgFile')
  //   .get(basicParser.parseImg);
  // //   .get(todoList.getTodo)
  // //   .put(todoList.updateTodo)
  // //   .delete(todoList.deleteTodo);

};