'use strict';

const mariadb = require('mariadb');
const pool = mariadb.createPool({host: 'mydb.com', user:'myUser', connectionLimit: 5});


exports.list_all_tasks = function(req, res) {
    pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT * from event")
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          conn.end()
          res.json({success: true, data: rows})
        })
        .catch(err => {
          conn.end();
          res.json({success: false, msg: 'There is a problem getting events'})
        })
        
    }).catch(err => {
      //not connected
    });
};




exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

/*
conn.query("SELECT 1 as val")
.then((rows) => {
  console.log(rows); //[ {val: 1}, meta: ... ]
  return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
})
.then((res) => {
  console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  conn.end();
})
.catch(err => {
  //handle error
  conn.end();
})

}).catch(err => {
//not connected
});
*/