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
    // const user = req.user;
    console.log(user)

	let sql = "SELECT * FROM ?? WHERE ?? = ?";
	let inserts = ['dares', 'userId', user[0].userId];

	sql = mysql.format(sql, inserts);
	console.log(sql)
	connection.query(sql, (err, rows) => {
		if (err) throw err;
		// let objDare = {};
		// objDare = {results: rows};
		console.log(rows);
		res.send(rows);
	});
});

router.get('/punishments', isAuthenticated, function(req, res, next) {
    // const user = req.user;
    // console.log(user)

	let sql = "SELECT * FROM ?? WHERE ?? = ?";
	let inserts = ['punishments', 'userId', user[0].userId];

	sql = mysql.format(sql, inserts);
	// console.log(sql)
	connection.query(sql, (err, rows) => {
		if (err) throw err;
		// let objDare = {};
		// objDare = {results: rows};
		// console.log(rows);
		res.send(rows);
	});
});

module.exports = router;