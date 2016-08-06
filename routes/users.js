var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt');
var sequelize = require('sequelize');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//json create user
router.post('/add', function(req,res,next) {

	var hash = bcrypt.hashSync(req.body.password, 10);

	var user = {
		name: req.body.username,
		LoginInfo: {
			passwordHash: hash
		}
	};
	
	models.User.create(user, {include: [models.LoginInfo]}).then(function(user) {
		res.send({status:200, message:"Account "+user.name+" created!"});
	}).catch(function (err) {
		if (err.name == "SequelizeUniqueConstraintError") {
			res.status(400).send({status:400, message:"The username "+req.body.username+" is already taken."});
		}
		else {
			res.status(400).send({status:400, message:"Error"});
		}
	});

});

//user page
router.get('/:username', function(req,res,next) {
	models.User.findOne({
		include: [models.Poll],
		where: sequelize.where(
			sequelize.fn('lower', sequelize.col('name')),
			req.params.username.toLowerCase()
		)
	}).then(function(user) {
		if (!user) return next();

		res.render('users/user', {
			user: restrict(user, ['id','name','Polls'])
		});
	});
});

module.exports = router;
