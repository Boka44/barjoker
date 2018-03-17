const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../models/database')

function isAuthenticated(req, res, next) {

  if (req.isAuthenticated())

  	console.log('isAuthenticated')

    return next();

  res.redirect('/signup');

}
let user = {};

router.get('/', isAuthenticated, function(req, res, next) {
	user = req.user;
    console.log("user: " + user)
    res.render('./pages/customGame', {
    	user: user
    });
});

router.get('/dares', isAuthenticated, function(req, res, next) {
	let sql = "SELECT * FROM ?? WHERE ?? = ?";
	let inserts = ['Dares', 'userId', user[0].userId];
	sql = mysql.format(sql, inserts);
	console.log(sql)
	connection.query(sql, (err, rows) => {
		if (err) throw err;
		console.log(rows);
		res.send(rows);
	});
});

router.get('/punishments', isAuthenticated, function(req, res, next) {
	let sql = "SELECT * FROM ?? WHERE ?? = ?";
	let inserts = ['Punishments', 'userId', user[0].userId];
	sql = mysql.format(sql, inserts);
	connection.query(sql, (err, rows) => {
		if (err) throw err;
		res.send(rows);
	});
});

router.get('/successes', isAuthenticated, (req, res, next) => {
	let sql = "SELECT * FROM ?? WHERE ?? = ?";
	let inserts = ['Successes', 'userId', user[0].userId];
	sql = mysql.format(sql, inserts);
	connection.query(sql, (err, rows) => {
		if (err) throw err;
		res.send(rows);
	});
});

module.exports = router;