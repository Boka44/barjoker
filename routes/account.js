const express = require('express');
const router = express.Router();

function isAuthenticated(req, res, next) {

  if (req.isAuthenticated()) {

  	console.log('isAuthenticated')

    return next();
  };

  res.redirect('/signup');

}

router.get('/', isAuthenticated, function(req, res, next) {
  console.log("req.user: " + req.user);
  res.render('./pages/account', {
  	user: req.user
  });
});

module.exports = router;
