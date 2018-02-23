var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('./pages/home');
});

router.get('/friends', function(req, res, next) {
  res.send({ message: "hello friends" })
});

module.exports = router;
