const express = require('express');
const mysql = require('mysql');
const MySQLPool = require("mysql-pool").MySQLPool;
const connection = require('../models/database')//.connection;
// const customDares = require('../routes/customDares');

module.exports = {
	insertIntoDb: function insertIntoDb(newDareInsert, userId) {
		let sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
		let inserts = ["Dares", "dare", "userId", newDareInsert, userId];
		sql = mysql.format(sql, inserts);
		connection.query(sql, function(err, results, fields) {
			if(err) 
				throw err;
			console.log(newDareInsert);
			
		});
	},

	deleteDare: function deleteDare(id) {
		let sql = "DELETE FROM ?? WHERE dareId = ? ";
		let inserts = ['Dares', id];
		sql = mysql.format(sql, inserts);
		connection.query(sql, function(err, results, fields) {
			if(err) 
				throw err;			
		});
	},

	updateDb: function updateDb(newDareInsert, userId) {
		let sql = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		let inserts = ["Dares", "dare", newDareInsert, "userId",  userId];
		sql = mysql.format(sql, inserts);
		connection.query(sql, function(err, results, fields) {
			if(err) 
				throw err;
			
		});
	}
};