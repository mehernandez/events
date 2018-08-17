'use strict';

const mysql = require('mysql');
const credentials = {
  host: 'localhost',
  user: 'mario',
  password: 'smbxboxm',
  database: 'events'
};

// Get all events
exports.list_all_events = function (req, res) {

  const con = mysql.createConnection(credentials);

  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM events ORDER BY start ASC", function (err, result) {
      if (err) {
        console.log(err);
        res.json({ success: false, msg: 'There is a problem getting events' });
      } else {
        res.json({ success: true, data: result });
      }
    });
  });
};

// Get user events
exports.list_events = function (req, res) {

  const con = mysql.createConnection(credentials);

  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM events WHERE user_id = '" + req.params.userId + "' ORDER BY start ASC", function (err, result) {
      if (err) {
        console.log(err);
        res.json({ success: false, msg: 'There is a problem getting events' });
      } else {
        res.json({ success: true, data: result });
      }
    });
  });
};

// Create event
exports.create_event = function (req, res) {

  const con = mysql.createConnection(credentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log("INSERT INTO events values (NULL,'" + req.body.name + "','" + req.body.category + "','" + req.body.place + "','" + req.body.address + "','" + req.body.start + "','" + req.body.end + "'," + req.body.virt + ",'" + req.params.userId + "')");
    con.query("INSERT INTO events values (NULL,'" + req.body.name + "','" + req.body.category + "','" + req.body.place + "','" + req.body.address + "','" + req.body.start + "','" + req.body.end + "'," + req.body.virt + "," + req.params.userId + ")", function (err, result) {
      if (err) {
        console.log(err);
        res.json({ success: false, msg: 'There is a problem getting events' });
      } else {
        res.json({ success: true });
      }
    });
  });
};

// Edit event
exports.edit_event = function (req, res) {

  const con = mysql.createConnection(credentials);

  con.connect(function (err) {
    if (err) throw err;
    con.query("UPDATE events SET name = '" + req.body.name + "', category = '" + req.body.category + "', place = '" + req.body.place + "', address = '" + req.body.address + "', start = '" + req.body.start + "', end = '" + req.body.end + "', virt = " + req.body.virt + " WHERE event_id = " + req.params.eventId + "", function (err, result) {
      if (err) {
        console.log(err);
        res.json({ success: false, msg: 'There is a problem editing the event' });
      } else {
        res.json({ success: true });
      }
    });
  });
};

// Delete event
exports.delete_event = function (req, res) {

  const con = mysql.createConnection(credentials);

  con.connect(function (err) {
    if (err) throw err;
    con.query("DELETE FROM events WHERE event_id = '" + req.params.eventId + "'", function (err, result) {
      if (err) {
        console.log(err);
        res.json({ success: false, msg: 'There is a problem deleting the event' });
      } else {
        res.json({ success: true });
      }
    });
  });
};
