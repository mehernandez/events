'use strict';
module.exports = function(app) {

// Event routes
  var eventController = require('controllers/eventController');

  // All events
  app.route('/events')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);

 // Single event
  app.route('/event/:eventId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
};
