'use strict';
module.exports = function(app) {

// User routes
var userController = require('./controllers/userController');

  // Login
  app.route('/login')
    .post(userController.login);

  // User
  app.route('/user')
    .post(userController.create_user);

// Event routes
var eventController = require('./controllers/eventController');

  // All events
  app.route('/events')
    .get(eventController.list_all_events);

  // User events
  app.route('/user/:userId/events')
    .get(eventController.list_events)
    .post(eventController.create_event);


  // Single event
  app.route('/event/:eventId')
    .put(eventController.edit_event)
    .delete(eventController.delete_event);
};
