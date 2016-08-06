function ensureLoggedIn(req, res, next) {
	if (req.user) return next();

	var dest = (req.method=="GET") ? req.originalUrl : req.get('Referrer')
	
	res.redirect('/login?dest='+dest);
}

module.exports = ensureLoggedIn;