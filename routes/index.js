var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/login', function(req,res,next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) { return res.status(401).send("Invalid username or password."); }
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			return res.send("Logged in!");
		});
	})(req, res, next);
});

router.get('/logout', function(req,res) {
	req.logout();
	res.send("Logged out.");
});

module.exports = router;
