const express = require('express');
const mysql = require('mysql');
const connection = require('../models/database');
const customDares = require('../routes/customDares');

module.exports = {
	insertPun: function insertPun(pun, userId) {
		let sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
		let inserts = ["Punishments", "pun", "userId", pun, userId];
		sql = mysql.format(sql, inserts);
		connection.query(sql, function(err, results, fields) {
			if(err) 
				throw err;
			console.log("New punishment inserted.");
			
		});
	},

	deletePun: function deletePun(id) {
		let sql = "DELETE FROM ?? WHERE dareId = ? ";
		let inserts = ['Punishments', id];
		sql = mysql.format(sql, inserts);
		connection.query(sql, function(err, results, fields) {
			if(err) 
				throw err;			
		});
	},

	// updateDb: function updateDb(newDareInsert, userId) {
	// 	let sql = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
	// 	let inserts = ["Dares", "dare", newDareInsert, "userId",  userId];
	// 	sql = mysql.format(sql, inserts);
	// 	connection.query(sql, function(err, results, fields) {
	// 		if(err) 
	// 			throw err;
			
	// 	});
	// }
};