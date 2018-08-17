'use strict';

const mysql = require('mysql');
const credentials = {
    host: 'localhost',
    user: 'mario',
    password: 'smbxboxm',
    database: 'events'
};

// Login user
exports.login = function (req, res) {

    const con = mysql.createConnection(credentials);

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT user_id FROM users WHERE mail = '" + req.body.mail + "' AND password = '" + req.body.password + "'", function (err, result) {
            if (err) res.json({ success: false, msg: 'There is a problem getting events' });
            if (result) {
                res.json({ success: true, data: result[0] });
            }
            else {
                res.json({ success: false, msg: 'There is a problem logging in' });
            }
        });
    });
};

// Create user
exports.create_user = function (req, res) {

    console.log(req);

    const con = mysql.createConnection(credentials);

    con.connect(function (err) {
        if (err) throw err;
        con.query("INSERT INTO users values (NULL,'" + req.body.name + "','" + req.body.mail + "','" + req.body.password + "')", function (err, result) {
            console.log(err);
            console.log(result);
            
            if (err) res.json({ success: false, msg: 'There is a problem creating user' });
            res.json({ success: true });
        });
    });
};