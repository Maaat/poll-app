function ensureLoggedIn(req, res, next) {
	if (req.user) return next();
	else {
		res.status(400).send("You must be logged in.");
	}
}

module.exports = ensureLoggedIn;