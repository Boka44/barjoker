const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;

//set routes
require('./config/passport')(passport);
const login = require('./routes/login');
const drinks = require('./routes/drinks');
const home = require('./routes/home');
const prototype = require('./routes/prototype');
const signup = require('./routes/signup');
const account = require('./routes/account');
const customDares = require('./routes/customDares');
const customGame = require('./routes/customGame');
const logout = require('./routes/logout');
const customPunishments = require('./routes/customPunishments');
const customSuccesses = require('./routes/customSuccesses');

const database = require('./models/database');

app.use(express.static(path.join(__dirname, 'public')));

//support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// set up passport local and and express-session

app.use(session({ 
	secret: "itsASecretToEveryone",
	resave: false,
	saveUninitialized: false
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
	res.locals.loggedIn = req.isAuthenticated();
	next();
})

app.get('/', home);

app.use('/drinks', drinks);
app.use('/prototype', prototype);
app.use('/signup', signup);
app.use('/account', account);
app.use('/customDares', customDares);
app.use('/login', login);
app.use('/customGame', customGame);
app.use('/logout', logout);
app.use('/customPunishments', customPunishments);
app.use('/customSuccesses', customSuccesses);

let check = true;

 function updateDB() {

 	if(check) {

 	 function insertSuccess(success, userId) {
		let sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
		let inserts = ["Successes", "success", "userId", success, userId];
		sql = mysql.format(sql, inserts);
		connection.query(sql, function(err, results, fields) {
			if(err) 
				throw err;
			console.log("New success inserted.");
			
		});
	},


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
  for (var i = 1; i < 8; i++) {
  		for (let h = 0; h < successesDefault.length; i++){
  			insertSuccess(successesDefault(h),i)
  		}
  		
  	}	

  	check = false;
  } 


}

app.listen(PORT, function(){
  console.log("Live at Port " + PORT);
});
