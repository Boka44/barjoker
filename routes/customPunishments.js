const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../models/database')
const router = express.Router();
const customPunishments_controller = require('../controllers/customPunishments_controller');
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
	// console.log("user: " + req.user);
	// console.log("userid: " + user[0].userId)

	let sql = "SELECT * FROM ?? WHERE ?? = ?";
	let inserts = ['Punishments', 'userId', user[0].userId];
	sql = mysql.format(sql, inserts);
	// console.log(sql)
	connection.query(sql, (err, rows) => {
		if (err) throw err;
		let objDare = {};
		// console.log(rows[0]);
		objPun = {results: rows};
		// console.log(objDare);
		res.render('./pages/customPunishments', objPun);
	});
  
});

router.post('/', function(req, res) {
	const user = req.user;

	if (req.body.postPun == '') {
		res.redirect('back');
		
	} else {
		console.log(req.body.postPun);
		customPunishments_controller.insertPun(req.body.postPun, req.user[0].userId);
		res.redirect('back');
	};
	//console.log(req.body.deleteDare);


});

// router.put('/', function(req, res) {
// 	const id = req.body.id;
// 	const edit = req.body.putDare;
// 	customDares_controller.updateDb(edit, id);
// 	res.send({success: true});
// });

router.delete('/:id', function(req, res) {
	const id = req.params.id;
	customPunishments_controller.deletePun(id);
	res.send({success: true});
});

module.exports = router;
