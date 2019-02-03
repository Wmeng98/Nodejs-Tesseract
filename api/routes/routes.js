'use strict';

module.exports = function(app) {
  
  var basicParser = require('../controllers/parseController');
  // base url
  app.route('/')
    .get(basicParser.getBase);


  // todolist route
  app.route('/parse')
    .post(basicParser.postImg);
    // .post(basicParser.postImg);

  app.route('/parse/:imgFile')
    .get(basicParser.parseImg);
  //   .get(todoList.getTodo)
  //   .put(todoList.updateTodo)
  //   .delete(todoList.deleteTodo);

};