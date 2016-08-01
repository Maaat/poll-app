var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//json create user
router.post('/add', function(req,res,next) {
	var user = {
		name: req.body.username,
		Login: {
			password: req.body.password
		}
	};
	
	models.User.create(user, {include: [models.Login]}).then(function(user) {
		res.send({status:200, message:"Account "+user.name+" created!"});
	}).catch(function (err) {
		if (err.name == "SequelizeUniqueConstraintError" && err.fields.indexOf("name")!=-1) {
			res.status(400).send({status:400, message:"The username "+req.body.username+" is already taken."});
		}
		else {
			res.status(400).send({status:400, message:"Error"});
		}
	});
});

module.exports = router;
