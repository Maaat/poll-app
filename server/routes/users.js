var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcryptjs');
var sequelize = require('sequelize');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/currentUser', (req,res,next) => {
	if (typeof req.user != 'undefined') {
		res.send(restrict(req.user, ['id','name']));
	}
	else {
		res.send("Not logged in.");
	}
});

//json create user
router.post('/add', function(req,res,next) {

	var hash = bcrypt.hashSync(req.body.password, 10);

	var user = {
		name: req.body.username,
		LoginInfo: {
			passwordHash: hash
		},
		Discussion: {},
		DiscussionId: -1
	};
	
	models.User.create(user, {include: [models.LoginInfo, models.Discussion]}).then(function(user) {
		res.send("Account "+user.name+" created!");
	}).catch(function (err) {
		if (err.name == "SequelizeUniqueConstraintError") {
			res.status(400).send("The username "+req.body.username+" is already taken.");
		}
		else {
			res.status(400).send("Error");
		}
	});

});

//user page
router.get('/:username', function(req,res,next) {
	models.User.findOne({
		include: [
			models.Poll,
			{
				model: models.Discussion,
				include: {
					model: models.Comment,
					include: [{
						model: models.User,
						attributes: ['id', 'name']
					}]
				}
			}
		],
		where: sequelize.where(
			sequelize.fn('lower', sequelize.col('name')),
			req.params.username.toLowerCase()
		)
	}).then(function(user) {
		if (!user) {
			res.status(404).send("User not found.");
			return;
		}

		var discussion = user.Discussion.getTreeDiscussion();
		user = user.get({plain: true});
		user.Discussion = discussion;

		res.send(user);

	});
});

module.exports = router;
