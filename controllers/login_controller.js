const express = require('express');
const mysql = require('mysql');
const MySQLPool = require("mysql-pool").MySQLPool;
const connection = require('../models/database')
const bcrypt = require('bcrypt-nodejs');

module.exports = {
	generateHash: function generateHash(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
	},

	validPassword: function validPassword(password) {
		return bcrypt.compareSync(password, this.local.password);
	},

	addUser: function addUser(name, password, email) {

		let row;

		function generateHash(password) {
			return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
		}

		let sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
		let inserts = ["Users", "userName", "password", "email", name, generateHash(password), email];
		sql = mysql.format(sql, inserts);
		connection.query(sql, (err, rows) => {
			if(err) 
				throw err;
			console.log("User added!")
			row = rows[0];
		})
		return row;
	}
};