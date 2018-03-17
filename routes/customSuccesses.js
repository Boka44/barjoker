const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../models/database')
const router = express.Router();
const customSuccesses_controller = require('../controllers/customSuccesses_controller');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
  	console.log('isAuthenticated')
    return next();
  res.redirect('/login');
}

router.get('/', isAuthenticated, function(req, res, next) {

	const user = req.user;

	let sql = "SELECT * FROM ?? WHERE ?? = ?";
	let inserts = ['Successes', 'userId', user[0].userId];
	sql = mysql.format(sql, inserts);
	connection.query(sql, (err, rows) => {
		if (err) throw err;
		let objDare = {};
		objSuccess = {results: rows};
		res.render('./pages/customSuccesses', objSuccess);
	});
  
});

router.post('/', function(req, res) {
	const user = req.user;

	if (req.body.postSuccess == '') {
		res.redirect('back');
		
	} else {
		console.log(req.body.postSuccess);
		customSuccesses_controller.insertSuccess(req.body.postSuccess, req.user[0].userId);
		res.redirect('back');
	};
});

router.delete('/:id', function(req, res) {
	const id = req.params.id;
	customSuccesses_controller.deleteSuccess(id);
	res.send({success: true});
});

module.exports = router;