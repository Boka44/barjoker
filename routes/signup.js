const express = require('express');
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('./pages/signup', { message: req.flash('signupMessage') });
});

router.post('/', passport.authenticate('local-signup', {
	successRedirect: '/account',
	failureRedirect: '/signup',
	failureFlash: true
}));

module.exports = router;

