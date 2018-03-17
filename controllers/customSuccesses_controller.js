const express = require('express');
const mysql = require('mysql');
const connection = require('../models/database');

module.exports = {
	insertSuccess: function insertSuccess(success, userId) {
		let sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
		let inserts = ["Successes", "success", "userId", success, userId];
		sql = mysql.format(sql, inserts);
		connection.query(sql, function(err, results, fields) {
			if(err) 
				throw err;
			console.log("New success inserted.");
			
		});
	},

	deleteSuccess: function deleteSuccess(id) {
		let sql = "DELETE FROM ?? WHERE successId = ? ";
		let inserts = ['Successes', id];
		sql = mysql.format(sql, inserts);
		connection.query(sql, function(err, results, fields) {
			if(err) 
				throw err;			
		});
	},
};