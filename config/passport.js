const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const connection = require('../models/database');
const login_controller = require('../controllers/login_controller');
const bcrypt = require('bcrypt-nodejs');
const customDares_controller = require('../controllers/customDares_controller'); 
const customPunishments_controller = require('../controllers/customPunishments_controller');
const customSuccesses_controller = require('../controllers/customSuccesses_controller');
const fetch = require('node-fetch');


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

						// Send welcome email

						let data = {
								name: username,
								email: email
							};
						let formBody = []
						for (var property in data) {
							  var encodedKey = encodeURIComponent(property);
							  var encodedValue = encodeURIComponent(data[property]);
							  formBody.push(encodedKey + "=" + encodedValue);
							}
							formBody = formBody.join("&");

						const url = 'https://peaceful-reaches-32891.herokuapp.com/barjoker'
						fetch(url, {
							method: 'POST',
							headers: {
						    	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						    },
						    mode: 'cors',
							body: formBody
						}).then(res => res.json())
						.then(function (data) {
							console.log('Request success: ' + data);
						}).catch(function (error) {
							console.log('Request failure: ' + error);
						})

						let daresDefault = [
    "Pick an opponent, first one to wear a stranger's hat wins.",
    "Bum a cigarrete and light it backwards.",
    "Group writes a note to give to the person of their choosing. Without peeking, give it to them and roll with whatever happens.",
    "Introduce yourself as a rapper, and offer to incorporate three words into a short freestyle rap for them.",
    "Get a kiss on the cheek from a stranger.",
    "Give someone a lapdance.",
    "Offer to buy someone a drink, order, then thank them for the drink and walk away with it.",
    "Get half the bar to sing happy birthday to a stranger whose birthday it is not.",
    "Start a chant of the groups choosing.",
    "Create a dare.",
    "Create a dare.",
    "Create a dare.",
    "Create a dare.",
    "Put on a fake accent, then introduce yourself from the wrong country.",
    "Get someone to join you in doing 10 jumping jacks in the middle of the bar.",
    "Convince a stranger to give you a sip of their drink.",
    "Grab a cup of water and cheers five people while giving a toast made by the group.",
    "Find someone wearing American flag clothing and pledge allegiance.",
    "Squirt ketchup onto someones table, but make it so it seems totally normal and not out of context.",
    "Get a stranger to walk up to another friend and have them use the phrase 'Goose gonna get ya!'",
    "Tell a stranger that another stranger thinks they are cute.",
    "Create a secret handshake with someone at the bar with 5 different handshakes.",
    "Walk up to someone, create a fake porn star name and in front of their group claim you are their biggest fan.",
    "Have a conversation with someone, where you include the phrase 'Goose gonna get ya!' 10 times without raising suspicion.",
    "Switch two strangers hats.",
    "Switch places with the bouncer and ID an old person. Do not let them in due to the driver's license being 'fake'.",
    "Start a conga line that circles the bar with at least 10 participants.",
    "Create a 5 step dance and have someone copy your moves as you are dancing.",
    "Go up to a table with an open seat and tell a ridiculous story involving three unrelated topics of your choice.",
    "Give a presentation to a group of strangers on a bad idea of the groups choosing.",
    "Walk up to a stranger and give them five reasons why they should hate you.",
    "Start a conversation with a stranger, after every sentence they say, repeat their last phrase and say 'No thanks, I'm good!' three times before exiting."
  ];

						let punsDefault = [
	"Create a drink for the loser. Each player adds an ingredient.",
	"Buy the one who dared you a drink.",
	"Stand outside, face the bar, and sing a song of the groups choice. At least 1 verse and 1 chorus.",
	"Wear your pants backwards until you finish 2 drinks.",
	"Order a drink on the rocks, hold the ice. Then argue that you are right.",
	"Group chooses a karoake song to sing. With or without karaoke available.",
	"Introduce yourself to an attractive person of the groups choice, and immediately apologize for bad breathe or body odor.",
	"Challenge someone to a game to pool, talk mad shit, then lose tremendously.",
	"Spend half hour shoeless.",
	"Try licking your elbow while singing the alphabet.",
	"Make a toilet paper necklace and wear it for two drinks.",
	"Try and speak in shakespeare for 20 minutes.",
	"Create a punishment.",
	"Create a punishment.",
	"Create a punishment."
	];

						let successesDefault = [
	"Choose the who plays next.", 
	"Choose the who plays next.",
	"Choose the who plays next.",
	"Choose the who plays next.",
	"Choose the who plays next.",
	"Tallest person plays next.",
	"Smallest person plays next.",
	"Whoever dared you plays again.",
	"Person to your right plays next.",
	"Person to your left plays next.",
	"Last person to touch the bathroom door plays next.",
	"Last person to go outside of the bar plays next.",
	"First person to sip their drink plays next.",
	"Group chooses who plays next"
	];

  						

  						let sqlIdGet = "SELECT * FROM  ?? WHERE ?? = ?";
						let insertsIdGet = ["Users", "email", email];
						sqlIdGet = mysql.format(sqlIdGet, insertsIdGet);
						let user = connection.query(sqlIdGet, (err, rows) => {
						
							console.log("Current: email for test: " + email);
							console.log("Rows for current test " + rows[0].userId);
							let user = rows[0].userId;
							
							for(let i = 0; i < daresDefault.length; i++) {
								customDares_controller.insertIntoDb(daresDefault[i], user)
								
							}
							for(let i = 0; i < punsDefault.length; i++) {
								customPunishments_controller.insertPun(punsDefault[i],user)
							}
							for(let i = 0; i < successesDefault.length; i++) {
								customSuccesses_controller.insertSuccess(successesDefault[i],user)
							}

							
						})
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