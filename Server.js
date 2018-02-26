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



app.listen(PORT, function(){
  console.log("Live at Port " + PORT);
});
