const express = require('express');
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('./pages/login', { message: req.flash('loginMessage')});
});

router.post('/', passport.authenticate('local-login', {
	successRedirect: '/account',
	failureRedirect: '/login',
	failureFlash: true
}));

module.exports = router;
