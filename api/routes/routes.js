'use strict';

module.exports = function(app) {
  
  var basicParser = require('../controllers/parseController');

  // todolist route
  app.route('/parse')
    .get(basicParser.getImg);
    // .post(basicParser.postImg);

  app.route('/parse/:imgFile')
    .get(basicParser.parseImg);
  //   .get(todoList.getTodo)
  //   .put(todoList.updateTodo)
  //   .delete(todoList.deleteTodo);

};