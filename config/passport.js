const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const connection = require('../models/database');
const login_controller = require('../controllers/login_controller');
const bcrypt = require('bcrypt-nodejs');


// expose this function to our app using module.exports
module.exports = function(passport) {



	passport.serializeUser(function(user, done) {	
		console.log('serialize:')
		console.log(user)
	  done(null, user[0].userId);
	});
	 
	passport.deserializeUser(function(id, done) {		
		console.log('deserialize:')
		console.log("id = " + id)
	  let sql = "SELECT * FROM  ?? WHERE ?? = ?";
		let inserts = ["Users", "userId", id];
		sql = mysql.format(sql, inserts);
		connection.query(sql, (err, rows) =>{
	    	done(err, rows);
	  });
	});

	passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        emailField : 'email',
        passReqToCallback : true 
    }, (req, username, password, done) => {

		// const username = req.body.username;
		// const password = req.body.password;
		const email = req.body.email;

		console.log(username + " " + email + " " + password)
    	
    	process.nextTick(function() {
			let sql = "SELECT * FROM  ?? WHERE ?? = ?";
			let inserts = ["Users", "email", email];
			sql = mysql.format(sql, inserts);
			connection.query(sql, (err, rows) => {
				if(err)
					return done(err);
				if(rows.length) {
					console.log("User already exists.")
					console.log("Email: " + rows[0].email)
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				} else {
					function generateHash(password) {
						return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
					}
					let sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
					let inserts = ["Users", "userName", "password", "email", username, generateHash(password), email];
					sql = mysql.format(sql, inserts);
					connection.query(sql, (err, rows) => {
						if(err) 
							throw err;
						console.log("User added!")
						let sql = "SELECT * FROM  ?? WHERE ?? = ?";
						let inserts = ["Users", "email", email];
						sql = mysql.format(sql, inserts);
						connection.query(sql, (err, rows) => {
						return done(null, rows);
						})
					})

				}
			});
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    }, (req, username, password, done) => {

		// const username = req.body.username;
		// const password = req.body.password;

		console.log(username + " " + password)
    	
    	process.nextTick(function() {
			let sql = "SELECT * FROM  ?? WHERE ?? = ?";
			let inserts = ["Users", "email", username];
			sql = mysql.format(sql, inserts);
			connection.query(sql, (err, rows) => {
				console.log(rows)
				if(err) {
					return done(err);
				}
				if(!rows.length) {
					console.log("No user found.")
					return done(null, false, req.flash('loginMessage', 'No user found.'));
				}
				if(!(bcrypt.compareSync(password, rows[0].password))) {
					console.log('wrong password')
					return done(null, false, req.flash('loginMessage', 'Wrong password!'));
				}
				console.log('successful log in')
				return done(null, rows);

			});
		});
	}));
};