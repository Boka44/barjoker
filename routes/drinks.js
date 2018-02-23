var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var drinks = [
      { name: 'Bloody Mary', drunkness: 3 },
      { name: 'Martini', drunkness: 5 },
      { name: 'Scotch', drunkness: 10 }
  ];
  res.render('pages/drinks', {drinks: drinks});
});

module.exports = router;
