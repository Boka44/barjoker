const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../models/database')//.connection;
const router = express.Router();
const customDares_controller = require('../controllers/customDares_controller');
const mysql = require('mysql');

const app = express();

//support parsing of application/json type post data
app.use(bodyParser.json());
 
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


function isAuthenticated(req, res, next) {

  if (req.isAuthenticated())

  	console.log('isAuthenticated')

    return next();

  res.redirect('/login');

}

router.get('/', isAuthenticated, function(req, res, next) {

	const user = req.user;
	console.log("user: " + req.user);
	console.log("userid: " + user[0].userId)

	let sql = "SELECT * FROM ?? WHERE ?? = ?";
	let inserts = ['Dares', 'userId', user[0].userId];

	sql = mysql.format(sql, inserts);
	console.log(sql)
	connection.query(sql, (err, rows) => {
		if (err) throw err;
		let objDare = {};
		console.log(rows[0]);
		objDare = {results: rows};
		console.log(objDare);
		res.render('./pages/customDares', objDare);
	}); 
});

router.post('/', function(req, res) {
	const user = req.user;

	if (req.body.postDare == '') {
		res.redirect('back');
		
	} else {
		console.log(req.body.postDare);
		customDares_controller.insertIntoDb(req.body.postDare, req.user[0].userId);
		res.redirect('back');
	};
});

// router.put('/', function(req, res) {
// 	const id = req.body.id;
// 	const edit = req.body.putDare;
// 	customDares_controller.updateDb(edit, id);
// 	res.send({success: true});
// });

router.delete('/:id', function(req, res) {
	const id = req.params.id;
	customDares_controller.deleteDare(id);
	res.send({success: true});
});

module.exports = router;
